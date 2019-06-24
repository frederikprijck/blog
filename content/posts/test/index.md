---
path: "/blog/my-first-post"
title: "My first blog post "
description: This post is related to the gatsbyjs
date: '2018-09-26'
image: ''
tags: ["accessibility", "css"]
draft: true
---

As my girlfriend is a UX Designer, we occasionally find ourself talking about technical things during the evening.
Recently, we were discussing accessibility and how one could guarantee the tab order without (over)using the `tabindex` attribute.

I mean, `tabindex` can be useful, but I've seen people make use of it in situations that have no need for it. I would probably even argue to avoid them unless you really see no other way.

With this article, I hope to show you how you can control the tab order (and ensure it makes sense for everyone) without explicitly using tabindex.

Before continuing, let's take a look at our requirements:

> Create a form with a single input field that has two buttons positioned below it: Cancel and Submit.
> The cancel button should go on the left side and the submit button at the right side of the screen.

This doesn't sound hard and should be easily doable using the following markup:

```
<input style="width: 100%">
<div style="display: flex; justify-content: space-between">
  <button>Cancel</button>
  <button>Submit</button>
</div>
```

Thanks to the use of flex-box, we can easily ensure the above markup is rendered as per our requirements:

- A cancel button on the left
- A submit button on the right

If accessibility isn't something you worry about, you'll probably commit this and mark it as done.

However, I think we're not done yet as we have an issue when it comes to accessibility.

If you would put your cursor in the input field and press tab, you'll notice the cancel button is the first button that's being highlighted.
The reason this is happening is that the cancel button comes before the submit button in the DOM.

Even tho the requirements clearly stated the submit button has to be on the right, it didn't mention anything about accessibility. So why bother about accessibility, right?
What if I told you it takes us little to no time to ensure our accessibility is done right?

We can resolve the tab order in two ways:

- Make use of tabindex to define the order
- Switch the order of the elements in the DOM

As the requirement from a UX perspective is to have our submit button on the right and the cancel button on the left, you might think that making use of tabindex will make sense.
Agreeing, it solves our problem. However, I prefer to rely on the order of the elements appearing in the DOM, if possible.

Obviously, as this post is about avoiding unnecessary use of `tabindex`, I'm going to go with the first solution and switch the order of the elements in the DOM. But before doing so, let's have a look at how a solution using `tabindex` looks like and what possible issues it introduces.

```
<input tabindex="1" style="width: 100%">
<div style="display: flex; justify-content: space-between">
  <button tabindex="3">Cancel</button>
  <button tabindex="2">Submit</button>
</div>
```

As you can see, in order to control the tab order of the buttons using `tabindex`, we also need to apply `tabindex` to the input field and ensure all tabindex' values are in the correct order.
The reason we need to do this is because elements with a tabindex greater than 0 are focussed before elements with `tabindex="0"` (which is the default value). In our case, not adding a tabindex to the input field would make it focussed after the `cancel` button.

Important to note is that wherever we put the above markup in our HTML, the previous elements using a default tabindex will now be focussed after the input field, submit and cancel button.
Even though this could be exactly what you need, more often it can lead to weird behavior that's only noticed by people using their keyboard to navigate.

I prefer to avoid the potential issues introcuded by the tabindex solution by avoiding it in the first place while still ensuring keyboard navigation works as expected.

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
One way to do this is to apply `float: right` to the submit button and `float: left` to the cancel button.
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