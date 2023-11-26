# Sustainability

To ensure a sustainable project, we've taken advantage of different techniques.

## Images only

By only having images, and not including GIFs or videos, we reduce the amount of energy and datatraffic required by using our website. Wherever we had the opportunity, we used SVG images that are much smaller in size than other image formats.

## Caching

When the website performs API queries, we utilize caching to reduce the amount of traffic required to perform the functionality that the website offers the user. We utilize caching in a multitude of files, but two examples of where it is used are for favourites and reviews. In both of these cases we avoid fetching the data from the API if we already have it in cache, and when we submit a new review or add a new favorite we just add the data to the cache.

## Pagination

We utilize pagination to effectivly manage data presentation on our website. By breaking down content into smaller, more manageable chunks, pagination limits the amount of data loaded and displayed at any one time. This reduces the initial load time and bandwidth usage, contributing to a faster and more sustainable user experience.

## GraphQL

Our website utilizes GraphQL for efficient data querying. This approach allows us to request only the specific data we need from the API, avoiding the over-fetching of unnecessary information.
