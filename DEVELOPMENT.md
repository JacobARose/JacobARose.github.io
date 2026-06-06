# Local Development Guide

This guide documents the step-by-step process of running the local development server for your website (`JacobARose.github.io`) and integrating the local demo builds (`music-browser` and `kaoss-cloud`).

---

## 1. Directory Structure

For paths and build scripts to resolve correctly, it is assumed that all three repositories are cloned in the same parent directory:

```text
parent-directory/
├── JacobARose.github.io/   # Main website repository
├── music-browser/          # Music Browser demo repository
└── kaoss-cloud/            # Kaoss Cloud demo repository
```

---

## 2. Compiling the Project Demos

Before running the Jekyll site locally, you must compile both Vite applications using their subpath base configurations and copy the compiled output into the website's `demos/` directory.

### Step A: Compile Music Browser

1. Navigate to the `music-browser` directory.
2. Ensure Vite configuration (`vite.config.js`) has the base path configured:
   ```javascript
   base: "/demos/music-browser/";
   ```
3. Install dependencies and compile the production bundle:
   ```bash
   npm install
   npm run build
   ```
4. Copy the compiled outputs to the website repository:
   ```powershell
   # PowerShell (run from music-browser root)
   New-Item -ItemType Directory -Force -Path "../JacobARose.github.io/demos/music-browser"
   Copy-Item -Path "./dist/*" -Destination "../JacobARose.github.io/demos/music-browser" -Recurse -Force
   ```

### Step B: Compile Kaoss Cloud

1. Navigate to the `kaoss-cloud` directory.
2. Ensure Vite configuration (`vite.config.ts`) has the base path configured:
   ```typescript
   base: "/demos/kaoss-cloud/";
   ```
3. Compile the production bundle:
   ```bash
   npm run build
   ```
4. Copy the compiled outputs to the website repository:
   ```powershell
   # PowerShell (run from kaoss-cloud root)
   New-Item -ItemType Directory -Force -Path "../JacobARose.github.io/demos/kaoss-cloud"
   Copy-Item -Path "./dist/*" -Destination "../JacobARose.github.io/demos/kaoss-cloud" -Recurse -Force
   ```

---

## 3. Running the Jekyll Website locally (Docker)

All ruby and system dependencies for the Jekyll template are managed inside a Docker container.

> [!NOTE]
> The setup utilizes a customized `command` directive inside `docker-compose.yml` to run the startup script directly from the host mount (`/srv/jekyll/bin/entry_point.sh`). This script automatically runs `bundle install` inside the container at startup, ensuring any platform mismatches or missing gems are resolved dynamically.

### Step 1: Sync Gemfile Dependencies

If you make changes to the `Gemfile` (e.g. adding gems like `observer` or `ostruct` to resolve deprecations), you must update the lockfile for the container's platform:

```bash
docker compose run jekyll bundle install
```

This updates the `Gemfile.lock` on your host machine to include the `x86_64-linux` and `x86_64-linux-gnu` platforms.

### Step 2: Build the Container Image (Optional / Performance Optimization)

To make subsequent server startups instant (skipping the dynamic gem compilation step at startup), bake the resolved dependencies directly into the image layers:

```bash
docker compose build
```

### Step 3: Launch the Server

Start the container cleanly. This will clean up orphan runs, mount the code directory, copy the demo directories into `_site/demos/`, and start the Jekyll build server:

```bash
docker compose down --remove-orphans
docker compose up
```

---

## 4. Accessing Local Endpoints

Once the logs print `Server running... press ctrl-c to stop`, you can access your site and sub-projects at:

- **Main Website Homepage**: [http://localhost:8080/](http://localhost:8080/)
- **Projects Portfolio Showcase**: [http://localhost:8080/projects/](http://localhost:8080/projects/)
- **Music Browser Showcase Post**: [http://localhost:8080/projects/1_music-browser/](http://localhost:8080/projects/1_music-browser/)
- **Music Browser Live Demo**: [http://localhost:8080/demos/music-browser/](http://localhost:8080/demos/music-browser/)
- **Kaoss Cloud Showcase Post**: [http://localhost:8080/projects/2_kaoss-cloud/](http://localhost:8080/projects/2_kaoss-cloud/)
- **Kaoss Cloud Live Demo**: [http://localhost:8080/demos/kaoss-cloud/](http://localhost:8080/demos/kaoss-cloud/)
