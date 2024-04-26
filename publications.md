---
title: Publications
key: publications
layout: list
---

{% assign texts = site.data.texts | sort: 'year' | reverse %}

<main class="py-2">
<article class="container py-1 mt-5">
    {% for text in texts %}
    <div class="row my-4">
        <div class="col-lg-2 col-md-10"><img src="{{ text.image }}" class="img-fluid shadow-sm"></div>
        <div class="col-lg-2 col-md-10">{{ text.author }}</div>
        <div class="col-lg-4 col-md-8"><a href="{{ text.link }}">{{ text.title }}</a></div>        
        <div class="col-lg-3 col-md-12">{{ text.publication }}</div>
        <div class="col-1">{{ text.year }}</div>        
    </div>
    {% endfor %}
</article>
</main>