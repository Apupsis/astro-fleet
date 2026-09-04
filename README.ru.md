# Astro Fleet

[![CI](https://github.com/Indivar/astro-fleet/actions/workflows/ci.yml/badge.svg)](https://github.com/Indivar/astro-fleet/actions/workflows/ci.yml) [![GitHub release](https://img.shields.io/github/v/release/Indivar/astro-fleet)](https://github.com/Indivar/astro-fleet/releases) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Язык:** [English](README.md) | Русский

**Одна кодовая база — много сайтов.** Мультисайтовый Astro-монорепозиторий для
агентств и компаний с несколькими брендами.

Общие компоненты, design tokens на сайт, сборки через Turborepo и независимое
развёртывание на Cloudflare Pages, Vercel или свой VPS. Сайт создаётся одной
командой, брендируется пресетом и выходит на собственном домене.

Поиск по сайту, аналитика за согласием и полноценное SEO встроены и **по
умолчанию выключены** — каждое включается одной инструкцией.

**Сделано под AI-разработку.** Структура, типизированные props и конфиг сайта
в одном файле — чтобы ассистент работал в репозитории без догадок. Подробно
проверено с [Claude Code](https://claude.ai/claude-code); работает с Gemini CLI
и другими.

---

## С чего начать

### С Claude Code

Самый быстрый путь от нуля до живого сайта:

```bash
git clone https://github.com/Indivar/astro-fleet.git
cd astro-fleet
bun install
claude
```

Затем скажите, что нужно:

> Сделай сайт для acme.com. Мы изготавливаем металлоконструкции для коммерческих
> застройщиков в Окленде. Покупатель — менеджер проекта, который сравнивает
> подрядчиков по срокам и сертификации. Хочу, чтобы он запросил коммерческое
> предложение.

Claude автоматически читает [`CLAUDE.md`](CLAUDE.md) и проходит весь процесс:
scaffold, дизайн, контент, SEO, деплой.
**[Собрать сайт с Claude →](docs/build-a-site-with-claude.md)** — понятный
гайд для человека, с точными фразами на каждом шаге.

### Через CLI

```bash
bunx create-astro-fleet         # or: npm create astro-fleet
cd my-astro-fleet
bun install
bun run dev
```

Спросит целевую директорию, домен первого сайта и design preset. Флаги
`--domain` и `--preset` пропускают вопросы.

### Вручную

```bash
git clone https://github.com/Indivar/astro-fleet.git
cd astro-fleet
bun install
bun run dev          # starter site at localhost:4321
```

**Нужны** Bun 1.1+ и Node 20+. Аккаунт Cloudflare — только для деплоя, и он
бесплатный.

---

## Повседневные команды

```bash
# Develop
bun run dev                                    # every site (4321)
bun run dev --filter=acme.com                  # one site
bun run dev --filter=acme.com -- --port 4322   # a second alongside

# Build
bun run build                                  # all, in parallel
bun run build --filter=acme.com                # one

# Typecheck and lint
bun run lint

# Add a site
bunx create-astro-fleet add acme.com saas      # or:
./scripts/new-site.sh acme.com saas
bun install                                     # always, after adding

# Deploy
npx wrangler pages deploy sites/acme.com/dist \
  --project-name=acme-com --branch=main

# Self-hosted infrastructure
./scripts/setup-infra.sh acme.com,other.com
```

---

## Включение функций

Всё opt-in. Подробности в
[`CLAUDE.md`](CLAUDE.md) §6 и в [справочнике компонентов](docs/components.md).

### Поиск по сайту

Добавьте генератор индекса в build сайта, затем включите:

```jsonc
// package.json
"build": "astro build && node ../../packages/shared-ui/scripts/search-index.mjs"
```

```astro
<BaseLayout search searchPlaceholder="Pricing, integrations, security" ...>
```

Индекс строится из реально отданного HTML, подгружается при первом использовании
и никогда при загрузке страницы, около 1.8 KB gzip на страницу. Открывается
через `/` или Cmd-K. Без поискового сервиса, сервера и подписки.

### Аналитика с согласием

```astro
<BaseLayout gaId="G-XXXXXXXXXX" privacyHref="/privacy/" ...>
```

На этом вся интеграция. **Ничего не запрашивается у Google, пока посетитель не
согласится** — строже обычного Consent Mode v2, который сразу грузит скрипт с
отключённым трекингом. Global Privacy Control считается отказом.
`requireConsent={false}` возвращает стандартное поведение.

Цифры будут ниже, чем у сайта, который тегирует всех. Зато они совпадут с тем,
что написано на странице privacy.

### SEO

Автоматически, как только `site` задан в `astro.config.mjs`: title и description
на страницу, canonical, Open Graph, Twitter cards, JSON-LD, sitemap.
[SEO Recipes](docs/seo-recipes.md) — остальное: OG-картинки на страницу,
`lastmod` из git, `llms.txt` для answer engines, IndexNow, fuzzy-редиректы 404
и валидация на этапе сборки.

---

## Что входит

- **24 общих компонента + 3 layout** — header, footer, SEO head, CTA-блоки,
  карточки, формы, отзывы, breadcrumbs, таблицы цен, FAQ-аккордеоны, сетки
  команды, таймлайны, hero-слайдеры, разделители секций, таблицы сравнения,
  поиск и аналитика. Типизированные props, темизация через CSS-переменные, ноль
  JS, пока компоненту он не нужен.
- **Система design tokens** — три пресета (Corporate, SaaS, Warm) за интерфейсом
  TypeScript. Цвета и шрифты меняются на сайт без правок в коде компонентов.
- **Scaffold сайта** — `bunx create-astro-fleet` или `./scripts/new-site.sh`,
  с конфигом, стилями и pipeline сборки.
- **Поиск и аналитика**, как выше.
- **Готовность к CMS** — демо Meridian идёт с [Keystatic](https://keystatic.com);
  админка на `/keystatic` в dev, контент коммитится как markdown.
  [Adding a CMS](docs/adding-a-cms.md) — паттерн и альтернативы.
- **Self-hosted шрифты** — Astro Fonts API скачивает на этапе сборки и отдаёт
  с вашего домена. Без сторонних запросов в рантайме.
- **Независимость от фреймворка** — везде нативные `.astro`. React, Vue,
  Svelte, Solid или Preact подключаются к любому сайту через
  [Islands Architecture](https://docs.astro.build/en/concepts/islands/) Astro.
- **Шаблоны инфраструктуры** — опционально Docker Compose + Traefik + Caddy для
  self-hosting.
- **Операционное руководство для AI** — [`CLAUDE.md`](CLAUDE.md) ведёт от
  prerequisites до DNS, включая девять failure modes, которые тихо уезжают в
  прод в реальных проектах.

---

## Живые демо

Три полностью собранных сайта. Один монорепозиторий, одни общие компоненты,
три по-настоящему разных вида — пресеты это личности сайтов, а не смена
палитры.

| Пресет | Демо | Сценарий | Live |
|---|---|---|---|
| **Corporate** | [Meridian Advisory](sites/meridian-advisory.com) | Консалтинговая фирма | [astro-fleet-meridian.pages.dev](https://astro-fleet-meridian.pages.dev) |
| **SaaS** | [Flux Analytics](sites/flux-analytics.com) | Продуктовый сайт для developer-tool | [astro-fleet-flux.pages.dev](https://astro-fleet-flux.pages.dev) |
| **Warm** | [Olive & Vine](sites/olive-and-vine.com) | Районный ресторан | [astro-fleet-olive.pages.dev](https://astro-fleet-olive.pages.dev) |

<table>
  <tr>
    <td align="center"><strong>Corporate → Meridian Advisory</strong></td>
    <td align="center"><strong>SaaS → Flux Analytics</strong></td>
    <td align="center"><strong>Warm → Olive & Vine</strong></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/meridian-home.png" alt="Главная Meridian Advisory — корпоративный консалтинг с editorial hero, тёмной полосой статистики и navy/blue палитрой" /></td>
    <td><img src="docs/screenshots/flux-home.png" alt="Главная Flux Analytics — SaaS-продукт с тёмным hero, мокапом кода и emerald-акцентами" /></td>
    <td><img src="docs/screenshots/olive-home.png" alt="Главная Olive & Vine — ресторан с тёплым editorial hero, serif display и amber-акцентами" /></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/meridian-services.png" alt="Страница экспертизы Meridian Advisory — пронумерованные practice areas в editorial-вёрстке" /></td>
    <td><img src="docs/screenshots/flux-services.png" alt="Продуктовая страница Flux Analytics — тёмная сетка из шести карточек с иконками и тегами" /></td>
    <td><img src="docs/screenshots/olive-services.png" alt="Меню Olive & Vine — типографика с пунктирной линией, сгруппированная по блюдам" /></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/meridian-contact.png" alt="Контакты Meridian Advisory — форма запроса брифинга и сетка офисов" /></td>
    <td><img src="docs/screenshots/flux-contact.png" alt="Страница book-a-demo Flux Analytics — split-layout со списком выгод и формой" /></td>
    <td><img src="docs/screenshots/olive-contact.png" alt="Бронирование Olive & Vine — адрес, часы работы и форма резервации" /></td>
  </tr>
</table>

Каждый собирается из **одних и тех же общих компонентов**. Навигация, структура
секций, hero и типографика уникальны для каждого бренда.

---

## Сделано на Astro Fleet

Восемь сайтов в продакшене на этой кодовой базе, в восьми отраслях, плюс один
лендинг, который делит домен с сайтом выше и выглядит совсем иначе. Те же
компоненты, те же tokens, та же сборка.

<table>
<tr valign="top">
<td width="45%"><a href="https://www.edubold.com"><img src="docs/screenshots/production/edubold.jpg" alt="Главная EduBold — editorial serif-заголовок на бледно-зелёном, ниже реестр дневных цифр с тонкими линиями" /></a></td>
<td>

### [edubold.com](https://www.edubold.com)

**ERP для управления школами и трастами в Индии.** Поступления, плата,
посещаемость, зарплата и двойная бухгалтерия на одном наборе записей.

Свёрстан как ledger — потому что так уже живут индийские школы: тонкие линии,
индекс секций в левом поле, красный только для итогов и исправлений. Главная
открывается вопросами, которые директор задаёт в 8 утра, напротив каждого —
ответ.

Поиск по сайту, GA4 за согласием, блог с пагинацией и архивами. 46 страниц.

</td>
</tr>

<tr valign="top">
<td><a href="https://edubold.com/a-school-day/"><img src="docs/screenshots/production/aschoolday.jpg" alt="Лендинг A School Day — тёмно-синее звёздное небо, живые часы и таймлайн слева, sans-serif display-заголовок" /></a></td>
<td>

### [edubold.com/a-school-day/](https://edubold.com/a-school-day/)

**Тот же сайт — и совсем другой.** Long-form лендинг, который ведёт через один
учебный день от первого звонка до последнего, на том же домене, что и страница
выше.

Тёмно-синий на бледно-зелёном. Живые часы и таймлайн в поле вместо индекса
секций. Sans-serif display вместо serif. Сцены на скролле — расписание, которое
собирается само, чек, попадающий в журнал — вместо статичного реестра.

Здесь потому, что это говорит лучше любого аргумента: **кодовая база не
навязывает внешний вид.** В shared-слое ничего не пришлось ломать, чтобы это
собрать.

</td>
</tr>

<tr valign="top">
<td><a href="https://www.moiengineering.com"><img src="docs/screenshots/production/moi.jpg" alt="Главная MOI Engineering — сжатый uppercase-заголовок на navy и оранжевый технический чертёж зацепляющихся involute-зубчатых колёс" /></a></td>
<td>

### [moiengineering.com](https://www.moiengineering.com)

**Упаковочное и обёрточное оборудование с 1960 года.** Линии для сигарет,
капсульные машины для pharma, высокоскоростная обёртка, бандлинг и картонирование
— поставки производителям в 20+ странах.

Нарисован как инженерный документ: номера чертежей, метки ревизий, техническая
сетка и hero из настоящих involute-зубчатых колёс в WebGL. Каталог — 28 машин,
у каждой реальный specification sheet.

Самый крупный сайт здесь: 77 страниц.

</td>
</tr>

<tr valign="top">
<td><a href="https://www.hybridagrobots.com"><img src="docs/screenshots/production/hybrid.jpg" alt="Главная Hybrid Agrobots — тёмный hero с живой сценой сортировки яиц на конвейере в lime и чёрном" /></a></td>
<td>

### [hybridagrobots.com](https://www.hybridagrobots.com)

**Машины сортировки и калибровки на computer vision** для яиц, яблок, фруктов и
овощей — по размеру, весу, цвету и сорту.

Hero — сам продукт: живая линия сортировки в WebGL, яйца идут под vision-головой,
которая сортирует и отбраковывает на глазах. Одиннадцать машин, у каждой своя
сцена, lazy-load и замена на статичный кадр на мобильном, чтобы уложиться в
бюджет телефона.

</td>
</tr>

<tr valign="top">
<td><a href="https://boldreach.io"><img src="docs/screenshots/production/boldreach.jpg" alt="Главная BoldReach — крупный центрированный заголовок чёрным по белому над скриншотом CRM risk dashboard" /></a></td>
<td>

### [boldreach.io](https://boldreach.io)

**Field-sales CRM, которая заполняет себя сама.** Голосовые заметки становятся
контактами и сделками, pipeline подталкивает менеджеров в WhatsApp, сделки,
которые вот-вот сорвутся, помечаются до того, как кто-то спросит.

Самая большая сборка здесь: **512 страниц**, сгенерированных в пяти региональных
вариантах — цены, валюта и compliance-копирайт под рынок читателя без пяти
отдельных сайтов.

</td>
</tr>

<tr valign="top">
<td><a href="https://www.indivar.com"><img src="docs/screenshots/production/indivar.jpg" alt="Главная Indivar — независимый технологический консалтинг" /></a></td>
<td>

### [indivar.com](https://www.indivar.com)

**Независимый технологический консалтинг**: архитектура, облако и delivery для
организаций, которым уже продали платформу и которым нужен кто-то без доли в
ней.

95 страниц: мигрированный блог, каталоги услуг и продуктов, кейсы. Сверстан
так, чтобы читался как consultancy, а не как вендор — в этом и весь positioning.

</td>
</tr>

<tr valign="top">
<td><a href="https://www.stakteck.com"><img src="docs/screenshots/production/stakteck.jpg" alt="Главная StakTeck — IT-стаффинг и рекрутинг по Индии" /></a></td>
<td>

### [stakteck.com](https://www.stakteck.com)

**IT-стаффинг, контрактный найм и staff augmentation по Индии.** Вакансии,
вид talent-pipeline и сетки отраслевой экспертизы.

58 страниц. Самый ясный пример работы design-token системы: рекрутинговый бренд
делит все компоненты с сайтом промышленного оборудования и выглядит совсем
иначе.

</td>
</tr>

<tr valign="top">
<td><a href="https://www.vairi.com"><img src="docs/screenshots/production/vairi.jpg" alt="Главная Vairi Technologies — AI-усиленная разработка и автоматизация, Окленд" /></a></td>
<td>

### [vairi.com](https://www.vairi.com)

**AI-усиленная разработка ПО, бизнес-автоматизация, AI-driven SEO и маркетинг.**
Окленд, Новая Зеландия.

Единственный сайт здесь вне Индии — и тот, что сильнее всего нагружает
типографику token-системы. Service pillars, таблица цен, шаги процесса и форма
оценки.

</td>
</tr>

<tr valign="top">
<td><a href="https://www.claspt.app"><img src="docs/screenshots/production/claspt.jpg" alt="Главная Claspt — зашифрованные markdown-заметки и password vault" /></a></td>
<td>

### [claspt.app](https://www.claspt.app)

**Зашифрованные markdown-заметки и password vault** — Microsoft Store, macOS и
Linux.

Продуктовый сайт, а не корпоративный: пути скачивания по платформам, дерево
документации и блог. Единственная запись здесь, где GA4 уже работал до того,
как в репозитории появился компонент аналитики.

</td>
</tr>
</table>

Каждый URL запрошен и вернул 200 23 августа 2026. Полоска согласия внизу каждого
скриншота — это [компонент аналитики](#аналитика-с-согласием), корректно
работающий на первом визите: в этот момент Google ещё ничего не запрашивал.

Если выкатите сайт на Astro Fleet — откройте PR и добавьте его сюда.

---

## Документация

**Начните здесь**

- [Build a site with Claude](docs/build-a-site-with-claude.md) — от клона до живого домена, шаг за шагом
- [Getting Started](docs/getting-started.md) — от клона до первого деплоя за 15 минут
- [`CLAUDE.md`](CLAUDE.md) — операционное руководство, которое читает Claude. Стоит прочитать самому

**Сборка**

- [Adding a Site](docs/adding-a-site.md) — создание и настройка дополнительных сайтов
- [Components Reference](docs/components.md) — props, примеры и CSS-переменные для всех 24
- [Design Tokens](docs/design-tokens.md) — пресеты и свои палитры
- [Framework Integrations](docs/framework-integrations.md) — React, Vue, Svelte, islands, view transitions
- [Adding a CMS](docs/adding-a-cms.md) — паттерн Keystatic и когда выбрать другое

**Поставка**

- [SEO Recipes](docs/seo-recipes.md) — OG-картинки, `llms.txt`, IndexNow, валидация
- [Deployment](docs/deployment.md) — Cloudflare Pages, Vercel, Netlify, self-hosted
- [AI Workflow](docs/ai-workflow.md) — промпты, настройка инструментов, AI-паттерны
- [Changelog](CHANGELOG.md) — что изменилось и когда

---

## Стек

Astro 7 · Bun · Turborepo 2 · Tailwind CSS 4 · TypeScript · static-first, ноль JS
по умолчанию · работает с React, Vue, Svelte, Solid и Preact

## Лицензия

MIT. Используйте как угодно. См. [LICENSE](LICENSE).

## Авторы

Сделано [Indivar Software Solutions](https://indivar.com) — софтверной компанией
в Индии и Новой Зеландии. Мы крутим на Astro Fleet собственный портфель
корпоративных сайтов — семь из перечисленных выше.
