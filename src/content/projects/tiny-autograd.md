---
# PLACEHOLDER — replace this file with your own project case study.
title: "Tiny Autograd"
description: "A minimal reverse-mode autodiff engine written to understand tensors, tapes, and gradients without a framework."
date: 2026-08-01
image: "/images/projects/autograd.svg"
imageAlt: "Computation graph placeholder"
technologies:
  - Python
  - NumPy
github: "https://github.com/jung1ek"
status: completed
featured: true
---

## Problem

I could use PyTorch, but I could not explain what `backward` was doing on a graph I had not built myself.

## Solution

A small `Value` type, a handful of ops, and a topological sort. No CUDA, no broadcasting gymnastics, no installer.

## Features

- Scalar autodiff with addition, multiplication, and ReLU
- A toy MLP trained on a tiny dataset
- Tests that check gradients against finite differences

## Technologies

Python only, on purpose. The project is a teaching artifact, not a library.

## Development process

I started from Karpathy-style notebooks, then rewrote the engine twice: once to make the tape explicit, once to stop mutating graphs in confusing ways.

## Challenges

The first version stored parents as lists and leaked nodes. The second version made the graph obvious enough to draw on paper.

## Results

I can now read a framework backward pass without treating it as magic. That was the only success metric.

Replace the GitHub URL in the frontmatter with the real repository.
