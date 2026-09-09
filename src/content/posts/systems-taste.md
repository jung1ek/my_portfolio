---
# PLACEHOLDER — replace this file with your own writing.
title: "Systems taste: a checklist I actually use"
description: "A short list for when a program starts feeling clever instead of clear."
date: 2026-04-18
image: "/images/blog/systems.svg"
imageAlt: "Layered blocks suggesting a systems stack"
tags:
  - Systems
author: "Tek Jung"
featured: false
---

Placeholder checklist post — good for a medium-length note with nested lists.

## Before adding a cache

- Measure the miss.
- Write down the invalidation rule in one sentence.
- If you cannot, do not cache.

## Before adding a thread

- Is this latency or throughput?
- Can a batch on one core finish first?
- What owns the queue?

### Failure modes I keep seeing

- Shared mutable maps with a “we'll lock it later”
- Timeouts that retry the same poison message
- Logs that do not include the request id

## A quote I keep above the desk

> Make it work, make it correct, make it fast — and stop as soon as the next step is vanity.

Replace this list with yours. The format is the point.
