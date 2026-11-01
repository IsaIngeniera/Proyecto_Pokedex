# Pokeneas

Express application with seven fictional Pokeneas from Antioquia, an in-memory catalog, EJS layouts, and a responsive pastel blue and purple interface. Height is expressed in meters.

## Requirements

- Node.js 24 or later and npm.
- Docker for container execution.
- A public GCP bucket containing the seven images.

## Start on macOS

Open the extracted `pokeneas` folder in VS Code and use its terminal:

```bash
npm ci
npm start
```

Open http://localhost:3000/pokeneas and http://localhost:3000/api/pokeneas. The root URL redirects to the visual page. Stop with Control+C. Use `npm run dev` to restart automatically after source changes.

## Configure images

Replace `TU_BUCKET` in `src/config/appConfig.js` with your public bucket name, or start with:

```bash
GCP_BUCKET=YOUR_BUCKET npm start
```

This archive does not include character images. Upload these exact filenames to your GCP bucket:

- arepin.png
- carrielon.png
- silleterix.png
- guarapon.png
- montaner.png
- tintico.png
- orquidea.png

Confirm each object opens in an incognito browser, for example `https://storage.googleapis.com/YOUR_BUCKET/arepin.png`. Configure public object read access only for the dedicated workshop image bucket.

## Architecture

- `src/server.js`: composition entry point and HTTP listener.
- `src/config/appConfig.js`: explicit environment configuration.
- `src/data/pokeneas.js`: immutable in-memory records.
- `src/models/Pokenea.js`: private attributes, getters, and random selection.
- `src/controllers/User/PokeneaController.js`: orchestration, JSON, and viewData.
- `src/routes/web.js`: URL-to-controller connections.
- `src/views/layouts/app.ejs`: shared HTML structure.
- `src/views/User/pokeneas/index.ejs`: character page and image URLs.
- `public/css/pokeneas.css`: responsive appearance.
- `.github/workflows/dockerhub.yml`: image publication on main.

## API

GET `/api/pokeneas` returns `id`, `name`, `height`, `ability`, and `containerId`.
GET `/pokeneas` renders a random character, image, phrase, and container ID.
Each request selects independently. A repeated character or container ID is possible.
Outside Docker, containerId is the computer hostname. Inside a default Docker container, it is the container hostname, normally its short ID. Do not override the hostname if using it as container identification evidence.

## Docker local

Start Docker Desktop, then:

```bash
docker build -t pokeneas-app .
docker run -d --name pokeneas-local -p 8080:3000 -e GCP_BUCKET=YOUR_BUCKET pokeneas-app
```

Open http://localhost:8080/pokeneas and http://localhost:8080/api/pokeneas.

```bash
docker logs pokeneas-local
docker exec pokeneas-local hostname
```

## GitHub and Docker Hub

Create a public Docker Hub repository named `pokeneas`. In GitHub repository Settings > Secrets and variables > Actions, add:

- `DOCKERHUB_USERNAME`: Docker Hub account name.
- `DOCKERHUB_TOKEN`: Docker Hub access token with write permission.

Include hidden `.github`, `.gitignore`, and `.dockerignore` files when uploading the project. Do not include node_modules. Commit package-lock.json.
The workflow runs when changes reach main and publishes `YOUR_DOCKERHUB_USERNAME/pokeneas:latest` for linux/amd64 GCP machines. It can also be run manually from Actions.

If adopting the supplied team's branch workflow, create development and feature branches, submit a PR to development, and then a reviewed PR to main. Do not push directly to protected branches. Use English Conventional Commits such as `feat: add pokenea catalog`.

## GCP Swarm

Each partner must deploy in their own GCP account. Use four x86/AMD64 VMs with Docker in one VPC/subnet and external network access. Reuse the previous Docker installation template. Give all nodes the network tag `pokeneas`.

Allow TCP 80 from the Internet to that tag. Allow TCP 2377 and 7946 and UDP 7946 and 4789 only between those tagged nodes. Do not expose internal Swarm ports to the public Internet.

On the first VM:

```bash
sudo docker swarm init --advertise-addr INTERNAL_IP_NODE_1
sudo docker swarm join-token manager
```

Copy the generated manager join command and execute it with sudo on each of the other three VMs. On a manager:

```bash
sudo docker node ls
sudo docker service create --name pokeneas --replicas 10 --publish published=80,target=3000 --env GCP_BUCKET=YOUR_BUCKET YOUR_DOCKERHUB_USERNAME/pokeneas:latest
sudo docker service ls
sudo docker service ps pokeneas
```

Replace all uppercase markers. Expect four Ready managers (one Leader, three Reachable) and 10/10 replicas in total. Open http://EXTERNAL_IP/pokeneas and http://EXTERNAL_IP/api/pokeneas.

`docker ps` lists containers only on the current VM; `docker service ps pokeneas` lists service tasks across the cluster.

For a new image published under the same tag, update the existing service:

```bash
sudo docker service update --image YOUR_DOCKERHUB_USERNAME/pokeneas:latest --force pokeneas
```

## Submission evidence

- Console showing 10/10 replicas and ten current Running tasks.
- GCP bucket object list with all seven images.
- Two visual-page screenshots showing different container IDs.
- A working external IP for each partner.
- Keep GitHub and Docker Hub repository URLs available for the demonstration.

Read `docs/rules-compatibility.md` before claiming compliance with the Laravel-specific standard.
