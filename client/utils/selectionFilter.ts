export default function selectionFilter(results = []) {
    return {
      series: [
        { title: 'Documentaries', data: results?.filter((item) => item.genre === 'documentaries') },
        { title: 'Comedies', data: results?.filter((item) => item.genre === 'comedies') },
        { title: 'Children', data: results?.filter((item) => item.genre === 'children') },
        { title: 'Crime', data: results?.filter((item) => item.genre === 'crime') },
        { title: 'Feel Good', data: results?.filter((item) => item.genre === 'feel-good') },
      ],
      films: [
        { title: 'Drama', data: results?.filter((item) => item.genre === 'drama') },
        { title: 'Thriller', data: results?.filter((item) => item.genre === 'thriller') },
        { title: 'Children', data: results?.filter((item) => item.genre === 'children') },
        { title: 'Suspense', data: results?.filter((item) => item.genre === 'suspense') },
        { title: 'Romance', data: results?.filter((item) => item.genre === 'romance') },
      ],
    };
  }
  