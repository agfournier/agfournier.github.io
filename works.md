---
title: Works
key: works
layout: list
---


{% assign works = site.works | sort: 'year' | reverse %}

{% for work in works %}

<section class="container py-3">
    <article>
        <a href={{ work.url }}>
        <h2 class="display-4">{{ work.title }}</h2>
        <img src="{{ work.main_image }}" class="w-100">
        </a>
    </article>
<section>

{% endfor %}
