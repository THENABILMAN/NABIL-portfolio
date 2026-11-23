# Serving the twin's model with vLLM

vLLM needs an NVIDIA GPU, which Vercel does not have. Run it on a GPU machine and Vercel calls it over HTTPS.

## Start it

1. Put a long random `VLLM_API_KEY` in the root `.env` (`python -c "import secrets; print(secrets.token_urlsafe(32))"`).
2. Free GPU memory: the default `Qwen/Qwen3-4B-AWQ` needs about 5 GB of a 6 GB card (an estimate).
3. From the repo root: `docker compose --env-file .env -f infra/vllm/docker-compose.yml up -d`
4. Wait for "Application startup complete" in `docker compose --env-file .env -f infra/vllm/docker-compose.yml logs -f vllm`. The first start downloads the image and the model.
5. In the root `.env`, set `VLLM_BASE_URL=http://127.0.0.1:8001/v1` for local dev.

Check it:

```bash
curl http://127.0.0.1:8001/v1/models -H "Authorization: Bearer $VLLM_API_KEY"
```

## Make it reachable from Vercel

Vercel cannot reach `127.0.0.1`. Give port 8001 a stable HTTPS address, for example with Tailscale Funnel (`tailscale funnel --bg 8001`), or a named Cloudflare Tunnel if you own a domain. Cloudflare quick tunnels change address on restart, so they are only good for testing.

Expose only port 8001, the proxy. vLLM's API key does not cover endpoints outside `/v1`.

In Vercel set `VLLM_BASE_URL=https://<address>/v1`, `VLLM_API_KEY`, and `VLLM_MODEL`.

When the GPU machine is off, the twin uses OpenRouter if its key is set, and otherwise quotes evidence. For 24/7 serving, run the same compose file on a rented GPU.
