import Callout from 'nextra-theme-docs/callout'

# Setting up the Form builder on your server

<Callout emoji="ℹ️">
  You will need to have [Docker](https://docs.docker.com/desktop/) installed and
  running on your system.
</Callout>

Clone the [Form builder](https://github.com/AMPATH/ngx-openmrs-formbuilder) repository:

```sh
git clone https://github.com/AMPATH/ngx-openmrs-formbuilder
```

Navigate to the `ngx-openmrs-formbuilder` directory and install dependencies using:

```sh
npm install
```

Setup environment variables as follows:

```sh
export OPENMRS_HOST_URL = http://172.17.0.1

export OPENMRS_SECURE = false
```

<Callout emoji="ℹ️">
  http://172.17.0.1 is the OpenMRS host served by Docker on Linux. This could be
  different on Mac OS or Windows.
</Callout>

Create a Dockerized build by running:

```sh
docker build -t ng2-openmrs-formbuilder .
```

<Callout emoji="ℹ️">
  You could optionally tag your build if you wish to push it to Docker Hub e.g.
  `docker build -t ng2-openmrs-formbuilder:bug-fixes`
</Callout>

Spin up your Docker image using:

```sh
docker compose up
```

This will fire up a local server on `http://localhost:4200`.

## Troubleshooting

### I get an `unknown openmrs_host_url variable` error

- You may run into the following error:

  ```sh
  [emerg] 1#1: unknown "openmrs_host_url" variable
  nginx: [emerg] unknown "openmrs_host_url" variable
  ```

  To fix it, use lowercase for the environment variables in the set up step:

  ```sh
  export openmrs_host_url = http://172.17.0.1

  export openmrs_secure = false
  ```
