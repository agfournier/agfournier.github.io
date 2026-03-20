---
title: Publications
key: publications
layout: list
---

{% assign texts = site.data.texts | sort: 'year' | reverse %}

<main class="py-2">
<article class="container py-1 mt-5">
    <div class="row row-cols-1">
    {% for text in texts %}
    <div class="row my-4">
        <div class="col-lg-3 col-md-10"><img src="{{ text.image }}" class="img-fluid shadow-sm"></div>
        
        <div class="col-lg-9 col-md-8"><p style="font-size:smaller;">{{ text.author }}</p><a href="{{ text.link }}">{{ text.title }}</a><br>{{ text.publication }}, {{ text.year }}</div>     
    </div>
    {% endfor %}
    </div>
</article>
</main>