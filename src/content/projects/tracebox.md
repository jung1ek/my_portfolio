---
# PLACEHOLDER — replace this file with your own project case study.
title: "Tracebox"
description: "A small systems playground for inspecting syscalls, buffers, and timing on short-lived programs."
date: 2026-07-12
image: "/images/projects/tracebox.svg"
imageAlt: "Abstract systems trace"
technologies:
  - Rust
  - Linux
github: "https://github.com/jung1ek"
status: wip
featured: true
---

## Problem

I wanted a personal lab for “what did this process actually do,” without firing up a full observability stack.

## Solution

A focused Rust CLI that runs a command, records a slice of activity, and prints a timeline I can read in a terminal.

## Features

- Spawn and wait with a timeout
- Summaries for hot syscalls
- JSON output for later plotting

## Technologies used

Rust on Linux. No cloud. No dashboard.

## Development process

I wrote the happy path first: run `ls`, print something true. Then I added filters so the output stopped drowning in noise.

## Challenges

Permissions, truncated traces, and the temptation to build a GUI. The GUI lost.

## Results

Still a work in progress. The useful part already exists: a command I trust more than a vague feeling about performance.

Set `status` to `completed` when you are ready, and point `github` at the real repo.
