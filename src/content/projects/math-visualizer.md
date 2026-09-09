---
# PLACEHOLDER — replace this file with your own project case study.
title: "Math Visualizer"
description: "A Python tool for watching complex numbers, Euler's formula, and related identities move instead of sitting in a textbook."
date: 2026-05-20
image: "/images/projects/math.svg"
imageAlt: "Unit circle visualization placeholder"
technologies:
  - Python
  - Matplotlib
github: "https://github.com/jung1ek"
status: active
featured: true
---

## Problem

I could recite Euler's formula and still not feel rotation as multiplication.

## Solution

A small visualizer: a unit circle, a θ slider, and plots for the real and imaginary parts.

## Features

- Interactive angle control
- Side-by-side algebraic and geometric views
- Export of a frame for notes

## Screenshots

![Visualizer placeholder](/images/projects/math.svg)

Replace this image with a real capture from the app.

## Development process

The first UI had too many panels. I deleted most of them. The useful product is one motion and two traces.

## Challenges

Keeping the animation smooth while the math stayed exact. Float noise showed up as a jittering radius until I normalized.

## Results

I use it when I explain complex numbers to people who only met them as pairs of floats.

Update `github` and add a `demo` URL in the frontmatter if you host a web version.
