---
title: Works
key: works
layout: list
---

{% assign items = site.works | sort: 'year' | reverse %}

<main class="py-2">
{% for item in items %}
<article class="container py-1">
    <div class="row align-items-end">
        <div class="pt-5  col-12 col-md-3 text-center text-md-right">
            <h7 class="font-weight-light"><a href="{{ item.url }}" class="text-dark">{{ item.title }}</a></h7>
            <p class="font-weight-light font-smaller">{{ item.year }}</p>
            <div class="py-md-3"></div>
        </div>   
    <div class="col-12 col-md-9">
        <a href="{{ item.url }}"><img src="{{ item.main_image }}" class="w-100"></a>
    </div>
  </div>
</article>
{% endfor %}
</main>