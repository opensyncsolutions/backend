FROM node:20.11.1-alpine as development
WORKDIR /app
COPY . ./
RUN apk add --no-cache curl
RUN npm i  --legacy-peer-deps
ENV SERVER_PORT 3000
ENV FORCE_COLOR 3
ENV NODE_ENV development
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:${SERVER_PORT}/api/status || exit 1
EXPOSE ${SERVER_PORT}

FROM development as build
WORKDIR /app
RUN npm run build
RUN rm -rf node_modules
RUN npm cache verify
RUN npm ci --omit=dev --only=production --legacy-peer-deps
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

FROM node:lts-alpine3.16 as release
ENV NODE_ENV production
ENV SERVER_PORT 3000
ENV FORCE_COLOR 3
RUN apk add --no-cache curl
ENV TZ Africa/Dar_es_Salaam
WORKDIR /app
COPY --from=build /app/dist/ ./
COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/default__opensync_dp.png/ ./default__opensync_dp.png
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:${SERVER_PORT}/api/status || exit 1
EXPOSE ${SERVER_PORT}
