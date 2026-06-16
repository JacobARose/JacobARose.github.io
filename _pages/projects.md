---
layout: page
title: projects
permalink: /projects/
description: A collection of functional prototypes, experimental logic, and interface studies documented through code. Sharing technical explorations and structural inquiries.
nav: true
nav_order: 3
body_class: projects-body
---

<div class="projects-page-wrapper">
  <main class="projects-grid">
    <!-- Intro Panel (Static) -->
    <section class="panel intro span-medium">
      <p class="intro-text text-red">
        {{ page.description }}
      </p>
      <div class="panel-meta">
        <div>STATUS<br>LOCATION</div>
        <div class="meta-right text-red">UPLINK_ESTABLISHED<br>REPOS_SYS_V4.0</div>
      </div>
    </section>

    <!-- Dynamic Projects loop -->
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% for project in sorted_projects %}
      {% assign span_class = project.grid_span | default: "span-short" %}
      {% assign color_class = project.color_class | default: "text-white" %}
      {% assign custom_class = project.custom_class | default: "" %}

      {% assign meta_left = project.meta_left | default: "PROJECT // ARCHIVE<br>STATUS" %}
      {% assign meta_right = project.meta_right | default: "NODE_01<br>ACTIVE" %}

      <section class="panel {{ custom_class }} {{ span_class }}"
               onclick="openModal('{{ project.title | escape }}', '{{ project.description | escape }}', '{{ color_class }}', this)">
        <div>
          <h2 class="panel-title {{ color_class }}">{{ project.title }}</h2>
          <p class="panel-description">{{ project.description }}</p>
        </div>

        <!-- Hidden full content of the project (so we can render it dynamically inside the modal!) -->
        <div class="project-content-holder" style="display: none;">
          {{ project.content }}
        </div>

        <div class="panel-meta">
          <div>{{ meta_left | newline_to_br }}</div>
          <div class="meta-right {{ color_class }}">{{ meta_right | newline_to_br }}</div>
        </div>
      </section>
    {% endfor %}

  </main>

  <!-- Interactive Modal Overlay -->
  <div class="modal-overlay" id="popupModal" onclick="closeModal(event)">
    <div class="modal-window" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closeModal()">Close [Esc]</button>
      <div class="modal-content">
        <h3 id="modalTitle" class="text-white">Project Title</h3>
        <div class="modal-body">
          <div id="modalDescription" style="margin-bottom: 20px; font-weight: bold;">Project summary details.</div>
          <div id="modalContent">Project full content.</div>
          <p style="color: #615050; margin-top: 25px;">[ End of File. System execution termination successful. ]</p>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  const modal = document.getElementById('popupModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalContent = document.getElementById('modalContent');

  function openModal(title, description, colorClass, panelElement) {
    modalTitle.innerText = title;
    modalDesc.innerText = description;
    
    // Get the hidden content from the panel clicked
    const hiddenContent = panelElement.querySelector('.project-content-holder').innerHTML;
    modalContent.innerHTML = hiddenContent;

    // Apply color class to title depending on selected panel
    modalTitle.className = colorClass;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeModal(event) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  }

  // Close on hitting Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
</script>
