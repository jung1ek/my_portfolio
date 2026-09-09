---
# PLACEHOLDER — replace this file with your own writing.
title: "Notes from learning Rust the slow way"
description: "Ownership clicked later than the compiler errors. Here is the order I wish I had used."
date: 2026-08-22
image: "/images/blog/rust.svg"
imageAlt: "Geometric rust-colored composition"
tags:
  - Rust
  - Career
author: "Tek Jung"
featured: true
---

Placeholder notes on learning Rust. Keep, rewrite, or delete.

## A better order

1. Read values, then references, then mutation.
2. Write a CLI that owns its config struct.
3. Only then touch threads.

I skipped step two and paid for it with a week of `cannot borrow as mutable`.

## Ownership as a design tool

The compiler is not being pedantic for sport. If two functions both want to mutate the same buffer, you do not have an ownership problem. You have an API problem.

Useful questions:

- Who should free this?
- Who is allowed to alias it?
- Does this need to be a type, or is a function enough?

## A small example

```rust
fn total(xs: &[i32]) -> i32 {
    xs.iter().sum()
}
```

Borrow when you only need to look. Take `String` when the function must keep the data. That sentence is most of the beginner book.

I still reach for Python when I am exploring. Rust is for the program I want to keep.
