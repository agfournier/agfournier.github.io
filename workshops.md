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
        <div class="pt-5  col-12 col-md-4 text-center text-md-right">
            <h4 class="font-weight-light"><a href="{{ item.url }}" class="text-dark">{{ item.title }}</a></h4>
            <div class="py-md-3"></div>
        </div>   
    <div class="col-12 col-md-8">
        <a href="{{ item.url }}"><img src="{{ item.main_image }}" class="w-100"></a>
    </div>
  </div>
</article>
{% endfor %}
</main>