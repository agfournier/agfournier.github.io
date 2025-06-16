---
title: Bio
key: bio
layout: list
---


<main class="py-2" style="min-height:70vh;">

<article class="container py-1">
    <div class="row align-items-end">
        <div class="pt-5  col-12 col-md-2 text-center text-md-right">
        </div>   
        <div class="col-12 col-md-8" style="margin-top:50px">
<p>
Abelardo Gil-Fournier (Spain, 1979) is an artist and researcher, born in Rabat and based in Madrid. Originally trained in Physics, he holds a PhD in Art from Winchester School of Art (UK) and has worked as a researcher at FAMU in Prague. He is currently a grantee of a Leonardo scholarship from the BBVA Foundation.
</p>

<p>
His practice addresses the entwining of media and matter. His projects involve different techniques, spanning from installation to image, sound and computational processes where either the living or other so-called natural and planetary temporalities conflate with human visual cultures, knowledge systems and politics.
</p>

<p>
His work has been exhibited and discussed internationally, including venues such as Transmediale (Berlin), Fundación Cerezales Antonino y Cinia (León), IKKM (Weimar), Fotomuseum Winterthur (Switzerland), Design Museum (Shenzhen), Tabakalera (Donostia-San Sebastian), LeBal (Paris) and the Cultural Centers of Spain in Nicaragua and El Salvador.
</p>

<p>
He is the author, together with Jussi Parikka, of the book <em>Living Surfaces. Images, Plants and Environments of Media</em> (MIT Press 2024).      	
</p>


{% assign shows = site.data.shows | sort: 'year' | reverse %}

    <h5 class="py-4">Selected exhibitions</h5>
    {% for show in shows %}
    {{ show.year }} <a href="{{ show.link }}" style="text-decoration:none; font-style:italic;">{{ show.name }}</a> {{ show.venue }}<br>
    {% endfor %}

  </div>
  </div>
</article>


</main>