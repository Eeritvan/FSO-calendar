FROM oven/bun:alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun i --frozen-lockfile

COPY . .
RUN bun run build 


FROM oven/bun:alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY package.json bun.lock ./

RUN bun i -p --frozen-lockfile && \
    rm -rf /root/.bun/install/cache /app/bun.lock /tmp/*

EXPOSE 3000

CMD ["bun", "run", "start"]