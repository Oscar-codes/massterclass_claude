(function () {
  const STORAGE_KEY = "kodigo-workshop-progress-v1";
  const STEP_KEY = "kodigo-workshop-step-progress-v1";
  const MODE_KEY = "kodigo-workshop-mode-v1";

  const state = {
    checklist: {},
    stepProgress: {},
    currentStepIndex: 0
  };

  const PROMPT_STEP_MAP = {
    "bloque-1": { 2: [0], 4: [1], 5: [2], 6: [3], 7: [4] },
    "bloque-2": { 1: [0], 2: [1], 5: [2, 3, 4], 6: [5], 7: [6] },
    "bloque-3": { 2: [0], 3: [1], 4: [2], 5: [3], 6: [4] },
    "bloque-4": { 2: [0], 3: [1], 4: [2], 5: [3, 4, 5], 6: [6], 7: [7] }
  };

  const refs = {
    title: document.getElementById("practiceTitle"),
    summary: document.getElementById("practiceSummary"),
    duration: document.getElementById("practiceDuration"),
    objective: document.getElementById("practiceObjective"),
    tags: document.getElementById("practiceTags"),
    steps: document.getElementById("practiceSteps"),
    prompts: document.getElementById("practicePrompts"),
    resources: document.getElementById("practiceResources"),
    deliverables: document.getElementById("practiceDeliverables"),
    prevLink: document.getElementById("prevPracticeLink"),
    nextLink: document.getElementById("nextPracticeLink"),
    modeLabel: document.getElementById("pageModeLabel"),
    modeParticipanteBtn: document.getElementById("pageModeParticipanteBtn"),
    modeFacilitadorBtn: document.getElementById("pageModeFacilitadorBtn")
  };

  function init() {
    if (!workshopData || !Array.isArray(workshopData.practices)) {
      return;
    }

    const practiceId = document.body.getAttribute("data-practice-id");
    const practiceIndex = workshopData.practices.findIndex((item) => item.id === practiceId);
    const practice = workshopData.practices[practiceIndex] || workshopData.practices[0];

    loadProgress();
    loadStepProgress();
    state.currentStepIndex = getInitialStepIndex(practice);
    renderPractice(practice);
    renderNavLinks(practiceIndex);
    setupModeControls();
  }

  function renderPractice(practice) {
    document.title = `${practice.title} | Taller Claude Agentes IA`;
    refs.title.textContent = practice.title;
    refs.summary.textContent = practice.summary;
    refs.duration.textContent = practice.duration;
    refs.objective.textContent = `Objetivo: ${practice.objective}`;

    refs.tags.innerHTML = practice.tags.map((tag) => `<span class="k-pill">${tag}</span>`).join("");

    refs.steps.innerHTML = renderGuidedSteps(practice);
    bindGuidedStepControls(practice);

    refs.prompts.innerHTML = `
      <div class="k-progress-panel">
        <p class="k-progress-label mb-1">Prompts contextualizados</p>
        <p class="small text-secondary mb-0">Los prompts aparecen dentro del paso guiado correspondiente para que uses solo lo necesario en cada momento.</p>
      </div>
    `;

    refs.resources.innerHTML = practice.resources
      .map((resourceFile) => `<li class="list-group-item bg-transparent text-light border-secondary-subtle"><a class="k-resource-link" href="../resources/${resourceFile}" target="_blank" rel="noopener">${resourceFile}</a></li>`)
      .join("");

    ensureDeliverableProgressPanel();
    updateDeliverableProgress(practice);

    refs.deliverables.innerHTML = practice.deliverables
      .map((item, index) => {
        const key = checklistKey(practice.id, index);
        const checked = state.checklist[key] ? "checked" : "";

        return `
          <li class="list-group-item bg-transparent border-secondary-subtle">
            <label class="k-check-item">
              <input type="checkbox" data-check-key="${key}" ${checked}>
              <span>${escapeHtml(item)}</span>
            </label>
          </li>
        `;
      })
      .join("");

    refs.deliverables.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", onChecklistToggle);
    });
  }

  function renderNavLinks(practiceIndex) {
    const prev = workshopData.practices[practiceIndex - 1];
    const next = workshopData.practices[practiceIndex + 1];

    refs.prevLink.href = prev ? toPageHref(prev.page) : "../index.html#practicas";
    refs.prevLink.textContent = prev ? `Anterior: ${prev.title}` : "Volver a la ruta";

    refs.nextLink.href = next ? toPageHref(next.page) : "../index.html#practicas";
    refs.nextLink.textContent = next ? `Siguiente: ${next.title}` : "Ir al resumen general";
  }

  function setupModeControls() {
    let mode = localStorage.getItem(MODE_KEY);
    if (mode !== "facilitador") {
      mode = "participante";
    }

    applyMode(mode);

    refs.modeParticipanteBtn.addEventListener("click", () => applyMode("participante"));
    refs.modeFacilitadorBtn.addEventListener("click", () => {
      applyMode("facilitador");
      window.location.href = "facilitador.html";
    });
  }

  function toPageHref(path) {
    if (!path) {
      return "../index.html";
    }
    return path.replace("pages/", "");
  }

  function applyMode(mode) {
    document.body.setAttribute("data-mode", mode);
    localStorage.setItem(MODE_KEY, mode);

    refs.modeParticipanteBtn.classList.toggle("is-active", mode === "participante");
    refs.modeFacilitadorBtn.classList.toggle("is-active", mode === "facilitador");
    refs.modeLabel.textContent = `Modo actual: ${mode === "facilitador" ? "Facilitador" : "Participante"}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function checklistKey(practiceId, index) {
    return `${practiceId}-${index}`;
  }

  function onChecklistToggle(event) {
    const key = event.target.getAttribute("data-check-key");
    state.checklist[key] = event.target.checked;
    persistProgress();

    const practiceId = document.body.getAttribute("data-practice-id");
    const practice = workshopData.practices.find((item) => item.id === practiceId);
    if (practice) {
      updateDeliverableProgress(practice);
    }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        state.checklist = parsed;
      }
    } catch {
      state.checklist = {};
    }
  }

  function persistProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.checklist));
  }

  function loadStepProgress() {
    try {
      const raw = localStorage.getItem(STEP_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        state.stepProgress = parsed;
      }
    } catch {
      state.stepProgress = {};
    }
  }

  function persistStepProgress() {
    localStorage.setItem(STEP_KEY, JSON.stringify(state.stepProgress));
  }

  function stepKey(practiceId, index) {
    return `${practiceId}-step-${index}`;
  }

  function getInitialStepIndex(practice) {
    const firstIncomplete = practice.instructions.findIndex((_, index) => {
      return !state.stepProgress[stepKey(practice.id, index)];
    });

    return firstIncomplete === -1 ? 0 : firstIncomplete;
  }

  function getStepProgress(practice) {
    const total = practice.instructions.length;
    const completed = practice.instructions.reduce((count, _, index) => {
      return state.stepProgress[stepKey(practice.id, index)] ? count + 1 : count;
    }, 0);

    return {
      completed,
      total,
      percent: total ? Math.round((completed / total) * 100) : 0
    };
  }

  function renderGuidedSteps(practice) {
    const progress = getStepProgress(practice);
    const currentStep = practice.instructions[state.currentStepIndex] || practice.instructions[0];
    const currentKey = stepKey(practice.id, state.currentStepIndex);
    const currentComplete = Boolean(state.stepProgress[currentKey]);
    const atStart = state.currentStepIndex <= 0;
    const atEnd = state.currentStepIndex >= practice.instructions.length - 1;

    return `
      <section class="k-guided-flow">
        <div class="k-progress-panel mb-3">
          <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
            <div>
              <p class="k-progress-label mb-1">Modo guiado</p>
              <p class="mb-0">Paso ${state.currentStepIndex + 1} de ${practice.instructions.length}</p>
            </div>
            <span class="badge text-bg-dark border">${progress.completed}/${progress.total} pasos completados</span>
          </div>
          <div class="progress k-progress" role="progressbar" aria-label="Avance de pasos" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}">
            <div class="progress-bar" style="width:${progress.percent}%"></div>
          </div>
        </div>

        <div class="k-guided-stepper" aria-label="Pasos de la practica">
          ${practice.instructions.map((step, index) => renderGuidedStepButton(practice, step, index)).join("")}
        </div>

        <div class="k-guided-current">
          ${renderStepContextPanel(practice, state.currentStepIndex)}
          ${renderStep(currentStep, state.currentStepIndex)}
          ${renderStepHelp(practice, state.currentStepIndex)}
          ${renderStepPrompts(practice, state.currentStepIndex)}
          ${renderFacilitatorPanel(practice, state.currentStepIndex)}
        </div>

        <div class="k-guided-actions">
          <button class="btn btn-sm k-btn-outline" type="button" data-guided-action="prev" ${atStart ? "disabled" : ""}>Anterior</button>
          <button class="btn btn-sm ${currentComplete ? "k-btn-outline" : "k-btn-primary"}" type="button" data-guided-action="toggle-complete">
            ${currentComplete ? "Marcar como pendiente" : "Marcar paso completado"}
          </button>
          <button class="btn btn-sm k-btn-primary" type="button" data-guided-action="next" ${atEnd ? "disabled" : ""}>Siguiente paso</button>
        </div>
      </section>
    `;
  }

  function renderGuidedStepButton(practice, step, index) {
    const title = typeof step === "string" ? step : step.title || "Actividad";
    const phase = getStepPhase(practice, index);
    const isActive = index === state.currentStepIndex;
    const isComplete = Boolean(state.stepProgress[stepKey(practice.id, index)]);
    const classes = [
      "k-guided-step-btn",
      isActive ? "is-active" : "",
      isComplete ? "is-complete" : ""
    ].filter(Boolean).join(" ");

    return `
      <button class="${classes}" type="button" data-guided-step="${index}">
        <span>${index + 1}</span>
        <em>${escapeHtml(phase.label)}</em>
        <strong>${escapeHtml(title)}</strong>
      </button>
    `;
  }

  function bindGuidedStepControls(practice) {
    bindPromptCopyButtons(refs.steps);

    refs.steps.querySelectorAll("[data-guided-step]").forEach((button) => {
      button.addEventListener("click", () => {
        state.currentStepIndex = Number(button.getAttribute("data-guided-step"));
        refreshGuidedSteps(practice);
      });
    });

    refs.steps.querySelectorAll("[data-guided-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.getAttribute("data-guided-action");

        if (action === "prev") {
          state.currentStepIndex = Math.max(0, state.currentStepIndex - 1);
        }

        if (action === "next") {
          state.currentStepIndex = Math.min(practice.instructions.length - 1, state.currentStepIndex + 1);
        }

        if (action === "toggle-complete") {
          const key = stepKey(practice.id, state.currentStepIndex);
          state.stepProgress[key] = !state.stepProgress[key];
          persistStepProgress();
        }

        refreshGuidedSteps(practice);
      });
    });
  }

  function refreshGuidedSteps(practice) {
    refs.steps.innerHTML = renderGuidedSteps(practice);
    bindGuidedStepControls(practice);
  }

  function renderStepContextPanel(practice, index) {
    const phase = getStepPhase(practice, index);
    const help = getStepHelp(practice, index);

    return `
      <div class="k-step-context">
        <span class="k-step-phase ${phase.className}">${escapeHtml(phase.label)}</span>
        <div>
          <p class="k-step-context-title mb-1">${escapeHtml(phase.title)}</p>
          <p class="small text-secondary mb-0">${escapeHtml(help.successSignal)}</p>
        </div>
      </div>
    `;
  }

  function renderStepHelp(practice, index) {
    const help = getStepHelp(practice, index);

    return `
      <details class="k-help-panel">
        <summary>Necesito ayuda</summary>
        <div class="k-help-grid">
          <div>
            <strong>Si algo no aparece</strong>
            <p>${escapeHtml(help.troubleshooting)}</p>
          </div>
          <div>
            <strong>Como saber si vas bien</strong>
            <p>${escapeHtml(help.successSignal)}</p>
          </div>
          <div>
            <strong>Error comun</strong>
            <p>${escapeHtml(help.commonError)}</p>
          </div>
        </div>
      </details>
    `;
  }

  function renderFacilitatorPanel(practice, index) {
    const help = getStepHelp(practice, index);
    const phase = getStepPhase(practice, index);

    return `
      <aside class="k-facilitator-panel">
        <p class="k-progress-label mb-2">Vista facilitador</p>
        <div class="k-facilitator-grid">
          <div><strong>Tiempo</strong><span>${escapeHtml(getStepTime(practice, index))}</span></div>
          <div><strong>Senal positiva</strong><span>${escapeHtml(help.successSignal)}</span></div>
          <div><strong>Riesgo frecuente</strong><span>${escapeHtml(help.commonError)}</span></div>
          <div><strong>Transicion</strong><span>${escapeHtml(getTransitionCue(practice, index, phase.label))}</span></div>
        </div>
      </aside>
    `;
  }

  function renderStepPrompts(practice, index) {
    const prompts = getPromptIndexesForStep(practice, index)
      .map((promptIndex) => practice.prompts[promptIndex])
      .filter(Boolean);

    if (!prompts.length) {
      return `
        <div class="k-step-prompts-empty">
          <p class="k-progress-label mb-1">Prompt de este paso</p>
          <p class="small text-secondary mb-0">Este paso no requiere copiar un prompt. Ejecuta la accion en la herramienta y marca el paso cuando la hayas verificado.</p>
        </div>
      `;
    }

    return `
      <section class="k-step-prompts">
        <p class="k-progress-label mb-2">Prompt de este paso</p>
        ${prompts.map((prompt) => renderPrompt(prompt, "../resources/")).join("")}
      </section>
    `;
  }

  function getPromptIndexesForStep(practice, index) {
    const mapped = PROMPT_STEP_MAP[practice.id]?.[index];
    if (mapped) {
      return mapped;
    }

    const promptIndex = Math.min(index, practice.prompts.length - 1);
    return practice.prompts[promptIndex] ? [promptIndex] : [];
  }

  function getStepPhase(practice, index) {
    const total = practice.instructions.length;
    const ratio = total <= 1 ? 1 : index / (total - 1);

    if (ratio < 0.25) {
      return { label: "Preparacion", title: "Prepara contexto, archivos y herramienta.", className: "is-prep" };
    }

    if (ratio < 0.65) {
      return { label: "Ejecucion", title: "Haz la actividad principal del bloque.", className: "is-run" };
    }

    if (ratio < 0.88) {
      return { label: "Validacion", title: "Comprueba que el resultado funciona y tiene datos reales.", className: "is-check" };
    }

    return { label: "Cierre", title: "Documenta, mejora y prepara el siguiente bloque.", className: "is-close" };
  }

  function getStepTime(practice, index) {
    const step = practice.instructions[index];
    if (step && typeof step === "object" && step.meta) {
      return step.meta;
    }

    return practice.duration;
  }

  function getStepHelp(practice, index) {
    const title = getStepText(practice.instructions[index]).toLowerCase();

    if (title.includes("archivo") || title.includes("carpeta") || title.includes("fuente")) {
      return {
        troubleshooting: "Revisa nombres exactos, ubicacion del archivo y que el recurso este cargado en el proyecto correcto.",
        successSignal: "Puedes ver el archivo o Claude lo menciona con nombre y columnas especificas.",
        commonError: "Trabajar desde un chat suelto o una carpeta distinta a la indicada."
      };
    }

    if (title.includes("prompt") || title.includes("skill") || title.includes("modelo") || title.includes("analisis")) {
      return {
        troubleshooting: "Copia el prompt completo, ejecutalo dentro del proyecto correcto y revisa que la respuesta no sea generica.",
        successSignal: "La respuesta cita archivos, columnas, KPIs o secciones reales del taller.",
        commonError: "Aceptar una respuesta bonita pero sin trazabilidad hacia los datos cargados."
      };
    }

    if (title.includes("conector") || title.includes("cowork") || title.includes("scheduling") || title.includes("mcp")) {
      return {
        troubleshooting: "Verifica sesion, permisos, estado conectado y que estas usando la misma cuenta del taller.",
        successSignal: "La herramienta muestra estado conectado o la tarea se puede probar con exito.",
        commonError: "Configurar una automatizacion sin ejecutar una prueba inmediata."
      };
    }

    if (title.includes("valida") || title.includes("audita") || title.includes("offline") || title.includes("presentacion")) {
      return {
        troubleshooting: "Ejecuta la prueba indicada y documenta el error exacto antes de pedir correccion.",
        successSignal: "El resultado abre, filtra, calcula o se puede explicar con datos reales.",
        commonError: "Cerrar la practica sin comprobar el entregable final."
      };
    }

    return {
      troubleshooting: "Lee el objetivo del paso, ejecuta una accion concreta y compara el resultado con los entregables.",
      successSignal: "Puedes explicar que cambiaste, donde quedo guardado y por que sirve para el siguiente paso.",
      commonError: "Avanzar sin dejar evidencia verificable del paso."
    };
  }

  function getTransitionCue(practice, index, phase) {
    const nextStep = practice.instructions[index + 1];
    if (!nextStep) {
      return "Cerrar con checklist de entregables y pasar a la siguiente practica.";
    }

    return `Cuando el grupo confirme ${phase.toLowerCase()}, avanzar a: ${getStepText(nextStep)}.`;
  }

  function getStepText(step) {
    if (typeof step === "string") {
      return step;
    }

    return step?.title || step?.summary || "Siguiente actividad";
  }

  function ensureDeliverableProgressPanel() {
    if (document.getElementById("practiceDeliverableProgress")) {
      return;
    }

    refs.deliverables.insertAdjacentHTML("beforebegin", `
      <div id="practiceDeliverableProgress" class="k-progress-panel mb-3">
        <p class="k-progress-label mb-1">Avance de entregables</p>
        <p class="mb-2" id="practiceDeliverableProgressText">0/0 completados</p>
        <div class="progress k-progress" role="progressbar" aria-label="Avance de entregables" aria-valuemin="0" aria-valuemax="100">
          <div id="practiceDeliverableProgressBar" class="progress-bar" style="width:0%"></div>
        </div>
      </div>
    `);
  }

  function updateDeliverableProgress(practice) {
    const progress = getPracticeProgress(practice);
    const progressText = document.getElementById("practiceDeliverableProgressText");
    const progressBar = document.getElementById("practiceDeliverableProgressBar");

    if (!progressText || !progressBar) {
      return;
    }

    progressText.textContent = `${progress.completed}/${progress.total} completados`;
    progressBar.style.width = `${progress.percent}%`;
    progressBar.setAttribute("aria-valuenow", String(progress.percent));
  }

  function getPracticeProgress(practice) {
    const total = practice.deliverables.length;
    const completed = practice.deliverables.reduce((count, _, index) => {
      return state.checklist[checklistKey(practice.id, index)] ? count + 1 : count;
    }, 0);

    return {
      completed,
      total,
      percent: total ? Math.round((completed / total) * 100) : 0
    };
  }

  function renderStep(step, index) {
    if (typeof step === "string") {
      return `<div class="k-step"><strong>Paso ${index + 1}:</strong> ${escapeHtml(step)}</div>`;
    }

    const body = Array.isArray(step.body)
      ? step.body.map((paragraph) => `<p class="k-step-body">${escapeHtml(paragraph)}</p>`).join("")
      : step.body
        ? `<p class="k-step-body">${escapeHtml(step.body)}</p>`
        : "";
    const items = Array.isArray(step.items) && step.items.length
      ? `<ul class="k-step-list">${step.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";
    const path = Array.isArray(step.path) && step.path.length
      ? `<div class="k-step-path">${step.path.map((item, itemIndex) => `${itemIndex ? '<span class="k-step-arrow">/</span>' : ""}<span class="k-step-chip">${escapeHtml(item)}</span>`).join("")}</div>`
      : "";
    const note = step.note ? `<div class="k-step-note">${escapeHtml(step.note)}</div>` : "";
    const meta = step.meta ? `<span class="k-step-meta">${escapeHtml(step.meta)}</span>` : "";

    return `
      <article class="k-step">
        <span class="k-step-title">Paso ${index + 1}: ${escapeHtml(step.title || "Actividad")}</span>
        ${meta}
        ${step.summary ? `<p class="k-step-body">${escapeHtml(step.summary)}</p>` : ""}
        ${body}
        ${items}
        ${path}
        ${note}
      </article>
    `;
  }

  function renderPrompt(prompt, resourcePrefix) {
    if (typeof prompt === "string") {
      return `
        <details class="k-prompt-accordion">
          <summary>Prompt recomendado</summary>
          <div class="k-prompt">${escapeHtml(prompt)}</div>
        </details>
      `;
    }

    const files = Array.isArray(prompt.files) ? prompt.files : [];
    const fileLinks = files
      .map((file) => `<a class="k-prompt-file" href="${resourcePrefix}${escapeHtml(file)}" target="_blank" rel="noopener">${escapeHtml(file)}</a>`)
      .join("");

    return `
      <details class="k-prompt-accordion">
        <summary>${escapeHtml(prompt.title || "Prompt recomendado")}</summary>
        <article class="k-prompt">
          <div class="k-prompt-title">${escapeHtml(prompt.title || "Prompt recomendado")}</div>
          <button class="k-prompt-copy" type="button" data-copy-prompt>Copiar</button>
          ${fileLinks ? `<div class="k-prompt-files"><span>Archivos:</span>${fileLinks}</div>` : ""}
          <pre>${escapeHtml(prompt.prompt || "")}</pre>
          ${prompt.why ? `<div class="k-prompt-why"><strong>Validacion:</strong> ${escapeHtml(prompt.why)}</div>` : ""}
        </article>
      </details>
    `;
  }

  function bindPromptCopyButtons(root) {
    root.querySelectorAll("[data-copy-prompt]").forEach((button) => {
      button.addEventListener("click", async () => {
        const promptText = button.closest(".k-prompt").querySelector("pre").textContent.trim();
        try {
          await navigator.clipboard.writeText(promptText);
          button.textContent = "Copiado";
        } catch {
          button.textContent = "Error";
        }
        window.setTimeout(() => {
          button.textContent = "Copiar";
        }, 1400);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
