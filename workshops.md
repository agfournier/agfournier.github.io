---
title: Workshops
key: workshops
layout: list
---
{% assign items = site.workshops | sort: 'year' | reverse %}

<main class="py-2">
{% for item in items %}
<article class="container py-1">
    <div class="row align-items-end">
        <div class="pt-5  col-12 col-md-3 text-center text-md-right">
            <h7 class="font-weight-light"><a href="{{ item.url }}" class="text-dark">{{ item.title }}</a></h7>
            <div class="py-md-3"></div>
        </div>   
    <div class="col-12 col-md-9">
        <img src="{{ item.main_image }}" class="w-100">
    </div>
  </div>
</article>
{% endfor %}
</main>