---
title: Events
layout: list
---

<main class="py-2">
{% for post in site.posts %}
<article class="container py-1">
    <div class="row align-items-end">
        <div class="pt-5  col-12 col-md-2 text-center text-md-right">
        </div>   
    <div class="col-12 col-md-8">
            <h2 class="display-5 pt-5 pb-3"><a href="{{ post.url }}" class="text-dark">{{ post.title }}</a></h2>
            <p class="font-weight-light font-smaller">{{ post.date | date: '%B %d, %Y'}}</p>
        <img src="{{ post.main_image }}" class="mw-100 py-3">
        <p>{{ post.content }}</p>
    </div>
  </div>
</article>
{% endfor %}
</main>