---
title: Publications
key: publications
layout: list
---

{% assign texts = site.data.texts | sort: 'year' | reverse %}

<main class="py-2">
<article class="container-fluid py-1 mt-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
    {% for text in texts %}
    <div class="row my-4 pl-2">
        <div class="col-lg-4 col-3"><img src="{{ text.image }}" class="img-fluid shadow"></div>
        
        <div class="col-lg-8 col-9"><p style="font-size:smaller;">{{ text.author }}</p><a href="{{ text.link }}">{{ text.title }}</a><br>{{ text.publication }}, {{ text.year }}</div>     
    </div>
    {% endfor %}
    </div>
</article>
</main>