---
title: Works
key: works
layout: list
---
{% assign items = site.works | sort: 'year' | reverse %}
{% assign cuenta = 0 %}
<main class="py-2 mt-5">
{% for item in items %}
{% assign calc = cuenta | modulo: 2 %}
<article class="container py-1">
    <div class="row align-items-end my-4">        
    {% if calc >= 0 %}
        <div class="pt-5  col-12 col-md-4 text-center text-md-right">
            <h4 class="font-weight-light"><a href="{{ item.url }}" class="text-dark">{{ item.title }}</a></h4>
            <p class="font-weight-light font-smaller">{{ item.year }}</p>
            <div class="py-md-3"></div>
        </div>   
        <div class="col-12 col-md-8">
            <a href="{{ item.url }}"><img src="{{ item.main_image }}" class="w-100"></a>
        </div>
    {% else %}
        <div class="col-12 col-md-8">
            <a href="{{ item.url }}"><img src="{{ item.main_image }}" class="w-100"></a>
        </div>    
        <div class="pt-5  col-12 col-md-4 text-center text-md-right">
            <h4 class="font-weight-light"><a href="{{ item.url }}" class="text-dark">{{ item.title }}/a></h4>
            <p class="font-weight-light font-smaller">{{ item.year }}</p>
            <div class="py-md-3"></div>
        </div>   
    {% endif %}
  </div>
</article>
{% assign cuenta = cuenta | plus:'1' %}
{% endfor %}
</main>