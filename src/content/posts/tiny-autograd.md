---
# PLACEHOLDER — replace this file with your own writing.
title: "A tiny autograd engine from scratch"
description: "What you actually learn when you implement reverse-mode autodiff in a few hundred lines of Python."
date: 2026-09-09
image: "/images/blog/autograd.svg"
imageAlt: "Abstract diagram of a computation graph"
tags:
  - Programming
  - Machine Learning
author: "Tek Jung"
featured: true
---

This is **placeholder copy**. Swap it for a real essay when you have one. The point of this post is to show a longer technical article: headings, lists, a quote, and a code sample.

I wanted a mental model of backpropagation that did not depend on a framework. So I wrote a small engine: tensors, a tape, and a handful of ops.

## The problem

Most tutorials show you `loss.backward()` and then skip the part that matters. The interesting question is smaller:

- What is stored on the way forward?
- What is multiplied on the way back?
- Where does broadcasting hide?

## The solution

Keep a graph of `Value` nodes. Each node knows how it was produced and how to send a gradient to its parents.

```python
class Value:
    def __init__(self, data, _children=(), _op=""):
        self.data = data
        self.grad = 0.0
        self._prev = set(_children)
        self._backward = lambda: None

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), "+")

        def _backward():
            self.grad += out.grad
            other.grad += out.grad

        out._backward = _backward
        return out
```

That is enough to teach the rest of the engine. Multiplication, ReLU, and a topological sort come next.

## What surprised me

> The hard part was not calculus. It was the bookkeeping: every broadcast, every in-place update, every op that looks symmetric until a gradient arrives.

If you only remember one thing from a toy autograd: **gradients add**. Two paths into the same node are not a bug.

## Further reading

Replace these with your own links later:

- [GitHub](https://github.com/jung1ek)
- The project page for this work lives at [/projects/tiny-autograd](/projects/tiny-autograd)
