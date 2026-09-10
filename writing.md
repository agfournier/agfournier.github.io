---
title: Writing
key: writing
layout: list
---

{% assign texts = site.data.texts | sort: 'year' | reverse %}

<main class="py-2">
<article class="container py-1 mt-5">
    <div class="row row-cols-1">
    {% for text in texts %}
    {% if text.type == "writing" %}
    <div class="row my-4 pl-2">
        <div class="col-2"><img src="{{ text.image }}" class="img-fluid shadow"></div>
        
        <div class="col-10"><p style="font-size:smaller;">{{ text.author }}</p><a href="{{ text.link }}">{{ text.title }}</a><br>{{ text.publication }}, {{ text.year }}</div>     
    </div>
    {% endif %}
    {% endfor %}
    </div>
</article>
</main>