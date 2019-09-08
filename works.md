---
title: Works
key: works
layout: list
---


{% assign works = site.works | sort: 'year' | reverse %}

{% for work in works %}

<section class="container py-3">
    <article>
        <h2 class="display-4"><a href={{ work.url }}>{{ work.title }}</a></h2>
        <img src="{{ work.main_image }}" class="w-100">
    </article>
<section>

{% endfor %}
