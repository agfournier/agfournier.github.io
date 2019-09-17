---
title: Works
key: works
layout: list
---


{% assign works = site.works | sort: 'year' | reverse %}

<main class="py-2">
{% for work in works %}
<article class="container py-1">
    <div class="row align-items-end">
        <div class="pt-5  col-12 col-md-3 text-center text-md-right">
            <h7 class="font-weight-light"><a href="{{ work.url }}" class="text-dark">{{ work.title }}</a></h7>
            <p class="font-weight-light font-smaller">{{ work.year }}</p>
            <div class="py-md-3"></div>
        </div>   
    <div class="col-12 col-md-9">
        <img src="{{ work.main_image }}" class="w-100">
    </div>
  </div>
</article>
{% endfor %}
</main>