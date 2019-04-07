---
path: "/blog/my-first-post"
title: "My first blog post "
description: This post is related to the gatsbyjs
date: '2018-09-26'
image: ''
tags: ["accessibility", "css"]
---

---
path: "/blog/my-first-post"
title: "My first blog post "
description: This post is related to the gatsbyjs
date: '2018-09-26'
image: ''
tags: ["accessibility", "css"]
---

As my girlfriend is a UX Designer, we often find ourself talking about technical things during the evening.
Recently, we were discussing Accessibility and how one could guarantee the tab order without (over)using the `tabindex` attribute.

I mean, `tabindex` can be useful, but I've seen people make use of it in situations that have no need for it. I'd probably even recommend trying to avoid them unless you really see no other way (and it's fine to use them if you know you need it).

With this article, I hope to show you how you can control the tab order (and ensure it makes sense for everyone) without explicitly using tabindex.

Before continuing, let's take a look at our requirements:

> Create a form with a single field that has two buttons below it: Cancel and Submit.
> The cancel button should go on the left side, while the submit button should be positioned at the right side of the screen. Both below the input.

This doesn't sound hard and should be easily doable using the following markup:

```
<input style="width: 100%">
<div style="display: flex; justify-content: space-between">
  <button>Cancel</button>
  <button>Submit</button>
</div>
```

The above markup will render the input field and buttons as per our requirements:

- A cancel button which goes on the left
- A submit button which goes on the right

If accessibility isn't something you worry about, you'll probably commit this and mark it as done.

However, I think we're not done yet as we have an issue when it comes to accessibility.

If you would put your cursor in the input field and press tab, you'll notice the cancel button is the first button that's being highlighted.
The reason this is happening is that the cancel button comes before the submit button in the DOM.

Even tho the requirements clearly stated the submit button has to be on the right, it didn't mention anything about accessibility. So why bother about accessibility, right?
What if I told you it takes us little to no time to ensure our accessibility is done right!

We can resolve the tab order in two ways:

- Switch the order of the elements in the DOM
- Make use of tabindex to define the order

As the requirement from a UX perspective is to have our submit button on the right and the cancel button on the left, you might think that making use of tabindex will make sense.
Agreeing, it solves our problem. However, I prefer to rely on the order of the elements appearing in the DOM, if possible.

Obviously, as this post is about avoiding unnecessary use of `tabindex`, I'm going to go with the first solution and switch the order of the elements in the DOM.

```
<input style="width: 100%">
<div style="display: flex; justify-content: space-between">
  <button>Submit</button>
  <button>Cancel</button>
</div>
```

If you'd execute this markup, you'll notice that the tab order is fixed!
However, our UX designer is not going to like this as we were told to put the submit button on the right, but using the above markup it's positioned at the right.

Whenever something looks differently as to the way it's defined in the DOM, we can probably solve that by applying CSS.
One way to do this is to apply `float: right` to the submit button and `float-: left` to the cancel button.
However, as I'm using flexbox, it's even easier. All we have to do is apply `flex-direction: row-reverse` and we're good to go!

```
<input style="width: 100%">
<div style="display: flex; flex-direction: row-reverse; justify-content: space-between">
  <button>Submit</button>
  <button>Cancel</button>
</div>
```

As you'll notice, our result is exactly as we want it to be! The submit button is on the right and it's the one being highlighted the first.
Our DOM also makes sense, we have the submit button which comes before the cancel button.

By not using tabindex, I think we ensured our markup stays logic and is not affected by the way we want things to look.

> Note: I'm not claiming tabindex is a bad thing, it definitely isn't! However, I do think a lot of use-cases have no need for it (and are better handled differently).
> There are situations that do require you to use `tabindex`. However, keep in mind that it's probably a good idea to ensure the DOM is structured in a way that makes sense.