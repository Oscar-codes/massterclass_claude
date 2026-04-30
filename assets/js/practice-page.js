(function () {
  const MODE_KEY = "kodigo-workshop-mode-v1";

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

    refs.steps.innerHTML = practice.instructions
      .map((step, index) => renderStep(step, index))
      .join("");

    refs.prompts.innerHTML = practice.prompts
      .map((prompt) => renderPrompt(prompt, "../resources/"))
      .join("");
    bindPromptCopyButtons(refs.prompts);

    refs.resources.innerHTML = practice.resources
      .map((resourceFile) => `<li class="list-group-item bg-transparent text-light border-secondary-subtle"><a class="k-resource-link" href="../resources/${resourceFile}" target="_blank" rel="noopener">${resourceFile}</a></li>`)
      .join("");

    refs.deliverables.innerHTML = practice.deliverables
      .map((item) => `<li class="list-group-item bg-transparent text-light border-secondary-subtle">${item}</li>`)
      .join("");
  }

  function renderNavLinks(practiceIndex) {
    const prev = workshopData.practices[practiceIndex - 1];
    const next = workshopData.practices[practiceIndex + 1];

    refs.prevLink.href = prev ? toPageHref(prev.page) : "../index.html#practicas";
    refs.prevLink.textContent = prev ? `Anterior: ${prev.title}` : "Volver a la ruta";

    refs.nextLink.href = next ? toPageHref(next.page) : "../index.html#detalle";
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
      return `<div class="k-prompt">${escapeHtml(prompt)}</div>`;
    }

    const files = Array.isArray(prompt.files) ? prompt.files : [];
    const fileLinks = files
      .map((file) => `<a class="k-prompt-file" href="${resourcePrefix}${escapeHtml(file)}" target="_blank" rel="noopener">${escapeHtml(file)}</a>`)
      .join("");

    return `
      <article class="k-prompt">
        <div class="k-prompt-title">${escapeHtml(prompt.title || "Prompt recomendado")}</div>
        <button class="k-prompt-copy" type="button" data-copy-prompt>Copiar</button>
        ${fileLinks ? `<div class="k-prompt-files"><span>Archivos:</span>${fileLinks}</div>` : ""}
        <pre>${escapeHtml(prompt.prompt || "")}</pre>
        ${prompt.why ? `<div class="k-prompt-why"><strong>Validacion:</strong> ${escapeHtml(prompt.why)}</div>` : ""}
      </article>
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
