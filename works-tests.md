---
title: Works
key: works
layout: list
---


{% assign works = site.works | sort: 'year' | reverse %}

{% for work in works %}

<article class="container-fluid py-1">    
<div class="card">
  <img class="card-img" src="{{ work.main_image }}" alt="Card image">
  <div class="card-img-overlay">
   <div class="row align-items-end h-100">
   <div class="col-4 offset-2 p-3 bg-white">
    <h5 class="card-title"><a href="{{ work.url }}" class="text-dark">{{ work.title }}</a></h5>
    <p class="card-text">{{ work.year }}</p>
    </div>
    </div>
  </div>
</div>    
        
</article>
{% endfor %}
