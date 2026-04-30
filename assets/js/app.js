(function () {
  const STORAGE_KEY = "kodigo-workshop-progress-v1";
  const MODE_KEY = "kodigo-workshop-mode-v1";

  const state = {
    activePracticeId: null,
    query: "",
    checklist: {},
    mode: "participante"
  };

  const refs = {
    heroSubtitle: document.getElementById("heroSubtitle"),
    activeModeLabel: document.getElementById("activeModeLabel"),
    modeParticipanteBtn: document.getElementById("modeParticipanteBtn"),
    modeFacilitadorBtn: document.getElementById("modeFacilitadorBtn"),
    stepper: document.getElementById("practiceStepper"),
    agendaBody: document.getElementById("agendaBody"),
    resourcesGrid: document.getElementById("resourcesGrid"),
    navList: document.getElementById("practiceNav"),
    promptMiniList: document.getElementById("promptMiniList"),
    cardList: document.getElementById("practiceCards"),
    detailTitle: document.getElementById("detailTitle"),
    detailSummary: document.getElementById("detailSummary"),
    detailDuration: document.getElementById("detailDuration"),
    detailCompletion: document.getElementById("detailCompletion"),
    detailObjective: document.getElementById("detailObjective"),
    detailSteps: document.getElementById("detailSteps"),
    detailPrompts: document.getElementById("detailPrompts"),
    detailResources: document.getElementById("detailResources"),
    detailChecklist: document.getElementById("detailChecklist"),
    prevPracticeBtn: document.getElementById("prevPracticeBtn"),
    nextPracticeBtn: document.getElementById("nextPracticeBtn"),
    searchInput: document.getElementById("searchInput"),
    progressBar: document.getElementById("progressBar"),
    progressText: document.getElementById("progressText"),
    progressPercent: document.getElementById("progressPercent"),
    practiceCount: document.getElementById("practiceCount"),
    resourceCount: document.getElementById("resourceCount"),
    completedCount: document.getElementById("completedCount"),
    totalDuration: document.getElementById("totalDuration")
  };

  function init() {
    if (!workshopData || !Array.isArray(workshopData.practices)) {
      return;
    }

    state.activePracticeId = workshopData.practices[0].id;
    loadProgress();
    loadMode();
    applyMode();

    refs.heroSubtitle.textContent = workshopData.subtitle;
    renderAgenda();
    renderResources();
    renderMiniPrompts();
    renderStepper();
    renderSidebar();
    renderCards();
    renderDetail();
    updateHeaderStats();
    bindEvents();
    updateProgress();
  }

  function bindEvents() {
    refs.searchInput.addEventListener("input", onSearch);
    refs.prevPracticeBtn.addEventListener("click", goToPrevPractice);
    refs.nextPracticeBtn.addEventListener("click", goToNextPractice);
    refs.modeParticipanteBtn.addEventListener("click", () => setMode("participante"));
    refs.modeFacilitadorBtn.addEventListener("click", () => {
      setMode("facilitador");
      window.location.href = "pages/facilitador.html";
    });
  }

  function onSearch(event) {
    state.query = event.target.value.trim().toLowerCase();
    renderCards();
  }

  function updateHeaderStats() {
    const practiceCount = workshopData.practices.length;
    const resourceCount = workshopData.resources.length;
    const totalMinutes = workshopData.agenda.reduce((sum, block) => sum + parseMinutes(block.duration), 0);
    const completedItems = getCompletedDeliverablesCount();
    const totalItems = getTotalDeliverablesCount();

    refs.practiceCount.textContent = String(practiceCount);
    refs.resourceCount.textContent = String(resourceCount);
    refs.completedCount.textContent = `${completedItems}/${totalItems}`;
    refs.totalDuration.textContent = `${totalMinutes} min`;
  }

  function parseMinutes(durationText) {
    const raw = parseInt(durationText, 10);
    return Number.isNaN(raw) ? 0 : raw;
  }

  function renderAgenda() {
    refs.agendaBody.innerHTML = "";

    workshopData.agenda.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.block}</td>
        <td>${item.activity}</td>
        <td><span class="badge text-bg-secondary">${item.duration}</span></td>
      `;
      refs.agendaBody.appendChild(row);
    });
  }

  function renderResources() {
    refs.resourcesGrid.innerHTML = "";

    workshopData.resources.forEach((resource) => {
      const col = document.createElement("article");
      col.className = "col-md-6 col-xl-4";
      const req = resource.required ? "Obligatorio" : "Recomendado";
      const reqClass = resource.required ? "text-bg-warning" : "text-bg-info";

      col.innerHTML = `
        <div class="k-resource-card h-100 p-3">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h6 mb-0">${resource.file}</h3>
            <span class="badge ${reqClass}">${req}</span>
          </div>
          <p class="text-secondary small mb-2">${resource.description}</p>
          <p class="small mb-2"><strong>Usado en:</strong> ${resource.usedIn}</p>
          <a class="k-resource-link" href="resources/${resource.file}" target="_blank" rel="noopener">Abrir archivo</a>
        </div>
      `;

      refs.resourcesGrid.appendChild(col);
    });
  }

  function renderMiniPrompts() {
    refs.promptMiniList.innerHTML = "";

    workshopData.promptLibrary.forEach((item) => {
      const prompt = document.createElement("div");
      prompt.className = "k-mini-prompt";
      prompt.textContent = item.title;
      refs.promptMiniList.appendChild(prompt);
    });
  }

  function renderStepper() {
    refs.stepper.innerHTML = "";

    workshopData.practices.forEach((practice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "k-stepper-btn";
      button.setAttribute("data-stepper-id", practice.id);
      button.innerHTML = `
        <span class="k-stepper-order">Bloque ${index + 1}</span>
        <span class="k-stepper-label">${practice.title}</span>
      `;

      if (practice.id === state.activePracticeId) {
        button.classList.add("is-active");
      }

      if (isPracticeCompleted(practice.id)) {
        button.classList.add("is-complete");
      }

      button.addEventListener("click", () => {
        activatePractice(practice.id);
      });

      if (practice.page) {
        const pageLink = document.createElement("a");
        pageLink.className = "k-stepper-page-link";
        pageLink.href = practice.page;
        pageLink.textContent = "Pagina";
        pageLink.addEventListener("click", (event) => event.stopPropagation());
        button.appendChild(pageLink);
      }

      refs.stepper.appendChild(button);
    });
  }

  function renderSidebar() {
    refs.navList.innerHTML = "";

    workshopData.practices.forEach((practice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "list-group-item list-group-item-action";
      button.textContent = practice.title;
      button.setAttribute("data-practice-id", practice.id);

      if (practice.id === state.activePracticeId) {
        button.classList.add("active");
      }

      if (isPracticeCompleted(practice.id)) {
        button.textContent = `[OK] ${practice.title}`;
      }

      button.addEventListener("click", () => {
        activatePractice(practice.id);
        document.getElementById("detalle").scrollIntoView({ behavior: "smooth", block: "start" });
      });

      refs.navList.appendChild(button);
    });
  }

  function syncActiveSidebar() {
    const buttons = refs.navList.querySelectorAll("button");
    buttons.forEach((button) => {
      const isActive = button.getAttribute("data-practice-id") === state.activePracticeId;
      button.classList.toggle("active", isActive);
    });
  }

  function syncStepper() {
    const buttons = refs.stepper.querySelectorAll("button");
    buttons.forEach((button) => {
      const id = button.getAttribute("data-stepper-id");
      button.classList.toggle("is-active", id === state.activePracticeId);
      button.classList.toggle("is-complete", isPracticeCompleted(id));
    });
  }

  function filteredPractices() {
    if (!state.query) {
      return workshopData.practices;
    }

    return workshopData.practices.filter((practice) => {
      const haystack = [
        practice.title,
        practice.summary,
        practice.objective,
        practice.tags.join(" "),
        practice.instructions.map(stepSearchText).join(" "),
        practice.prompts.map(promptSearchText).join(" "),
        practice.resources.join(" ")
      ].join(" ").toLowerCase();

      return haystack.includes(state.query);
    });
  }

  function renderCards() {
    const practices = filteredPractices();
    refs.cardList.innerHTML = "";

    if (practices.length === 0) {
      refs.cardList.innerHTML = `
        <div class="col-12">
          <div class="alert alert-secondary mb-0" role="alert">
            No hay coincidencias. Prueba con otro termino.
          </div>
        </div>
      `;
      return;
    }

    practices.forEach((practice, index) => {
      const col = document.createElement("article");
      col.className = "col-md-6 fade-up";
      col.setAttribute("data-delay", String(index % 4));
      col.innerHTML = `
        <div class="k-topic-card h-100 p-3">
          <div class="d-flex justify-content-between align-items-start gap-2">
            <h3 class="h5 mb-1">${practice.title}</h3>
            <span class="badge text-bg-dark border">${practice.duration}</span>
          </div>
          <p class="text-secondary mb-2 k-card-summary">${practice.summary}</p>
          <div class="mb-3">${practice.tags.map((tag) => `<span class="k-pill">${tag}</span>`).join("")}</div>
          <div class="d-flex gap-2 mt-auto flex-wrap">
            <button class="btn btn-sm btn-outline-light" data-open-practice="${practice.id}">Ver practica</button>
            <a class="btn btn-sm k-btn-outline" href="${practice.page || "#"}" ${practice.page ? "" : "aria-disabled='true'"}>Pagina modular</a>
          </div>
        </div>
      `;

      col.className = state.mode === "facilitador" ? "col-sm-6 col-lg-4 col-xl-3 fade-up" : "col-md-6 fade-up";

      const action = col.querySelector("button[data-open-practice]");
      action.addEventListener("click", () => {
        activatePractice(practice.id);
        document.getElementById("detalle").scrollIntoView({ behavior: "smooth", block: "start" });
      });

      refs.cardList.appendChild(col);
    });
  }

  function currentPractice() {
    return workshopData.practices.find((practice) => practice.id === state.activePracticeId) || workshopData.practices[0];
  }

  function renderDetail() {
    const practice = currentPractice();
    const practiceIndex = workshopData.practices.findIndex((item) => item.id === practice.id);

    refs.detailTitle.textContent = practice.title;
    refs.detailSummary.textContent = practice.summary;
    refs.detailDuration.textContent = practice.duration;
    refs.detailCompletion.textContent = isPracticeCompleted(practice.id) ? "Completada" : "Pendiente";
    refs.detailObjective.textContent = `Objetivo: ${practice.objective}`;

    refs.prevPracticeBtn.disabled = practiceIndex <= 0;
    refs.nextPracticeBtn.disabled = practiceIndex >= workshopData.practices.length - 1;

    refs.detailSteps.innerHTML = practice.instructions
      .map((step, index) => renderStep(step, index))
      .join("");

    refs.detailPrompts.innerHTML = practice.prompts
      .map((prompt) => renderPrompt(prompt, "resources/"))
      .join("");
    bindPromptCopyButtons(refs.detailPrompts);

    refs.detailResources.innerHTML = practice.resources
      .map((resourceFile) => {
        return `<li class="list-group-item bg-transparent text-light border-secondary-subtle"><a class="k-resource-link" href="resources/${resourceFile}" target="_blank" rel="noopener">${resourceFile}</a></li>`;
      })
      .join("");

    refs.detailChecklist.innerHTML = practice.deliverables
      .map((item, index) => {
        const key = checklistKey(practice.id, index);
        const checked = state.checklist[key] ? "checked" : "";
        return `
          <li class="list-group-item bg-transparent border-secondary-subtle">
            <label class="k-check-item">
              <input type="checkbox" data-check-key="${key}" ${checked}>
              <span>${item}</span>
            </label>
          </li>
        `;
      })
      .join("");

    refs.detailChecklist.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", onChecklistToggle);
    });
  }

  function updateProgress() {
    const practices = workshopData.practices;
    const index = practices.findIndex((practice) => practice.id === state.activePracticeId);
    const currentStep = index + 1;
    const percent = Math.round((currentStep / practices.length) * 100);

    refs.progressBar.style.width = `${percent}%`;
    refs.progressBar.setAttribute("aria-valuenow", String(percent));
    refs.progressText.textContent = `Practica ${currentStep} de ${practices.length}`;
    refs.progressPercent.textContent = `${percent}%`;
  }

  function activatePractice(practiceId) {
    state.activePracticeId = practiceId;
    syncActiveSidebar();
    syncStepper();
    renderDetail();
    updateHeaderStats();
    updateProgress();
    renderSidebar();
  }

  function goToPrevPractice() {
    const currentIndex = workshopData.practices.findIndex((practice) => practice.id === state.activePracticeId);
    if (currentIndex > 0) {
      activatePractice(workshopData.practices[currentIndex - 1].id);
    }
  }

  function goToNextPractice() {
    const currentIndex = workshopData.practices.findIndex((practice) => practice.id === state.activePracticeId);
    if (currentIndex < workshopData.practices.length - 1) {
      activatePractice(workshopData.practices[currentIndex + 1].id);
    }
  }

  function checklistKey(practiceId, index) {
    return `${practiceId}-${index}`;
  }

  function onChecklistToggle(event) {
    const key = event.target.getAttribute("data-check-key");
    state.checklist[key] = event.target.checked;
    persistProgress();
    syncStepper();
    updateHeaderStats();
    renderSidebar();
    renderDetail();
  }

  function isPracticeCompleted(practiceId) {
    const practice = workshopData.practices.find((item) => item.id === practiceId);
    if (!practice || practice.deliverables.length === 0) {
      return false;
    }

    return practice.deliverables.every((_, index) => {
      return Boolean(state.checklist[checklistKey(practiceId, index)]);
    });
  }

  function getCompletedPracticesCount() {
    return workshopData.practices.filter((practice) => isPracticeCompleted(practice.id)).length;
  }

  function getTotalDeliverablesCount() {
    return workshopData.practices.reduce((sum, practice) => sum + practice.deliverables.length, 0);
  }

  function getCompletedDeliverablesCount() {
    let count = 0;
    workshopData.practices.forEach((practice) => {
      practice.deliverables.forEach((_, index) => {
        if (state.checklist[checklistKey(practice.id, index)]) {
          count += 1;
        }
      });
    });
    return count;
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

  function loadMode() {
    const savedMode = localStorage.getItem(MODE_KEY);
    state.mode = savedMode === "facilitador" ? "facilitador" : "participante";
  }

  function persistMode() {
    localStorage.setItem(MODE_KEY, state.mode);
  }

  function setMode(mode) {
    state.mode = mode;
    persistMode();
    applyMode();
    renderCards();
  }

  function applyMode() {
    document.body.setAttribute("data-mode", state.mode);
    refs.modeParticipanteBtn.classList.toggle("is-active", state.mode === "participante");
    refs.modeFacilitadorBtn.classList.toggle("is-active", state.mode === "facilitador");
    refs.activeModeLabel.textContent = `Modo actual: ${state.mode === "facilitador" ? "Facilitador" : "Participante"}`;
  }

  function persistProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.checklist));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function promptSearchText(prompt) {
    if (typeof prompt === "string") {
      return prompt;
    }

    return [
      prompt.title || "",
      prompt.prompt || "",
      Array.isArray(prompt.files) ? prompt.files.join(" ") : ""
    ].join(" ");
  }

  function stepSearchText(step) {
    if (typeof step === "string") {
      return step;
    }

    return [
      step.title || "",
      step.summary || "",
      step.body || "",
      Array.isArray(step.body) ? step.body.join(" ") : "",
      Array.isArray(step.items) ? step.items.join(" ") : "",
      Array.isArray(step.path) ? step.path.join(" ") : "",
      step.note || ""
    ].join(" ");
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
