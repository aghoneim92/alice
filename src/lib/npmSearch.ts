export default (search: string) =>
   typeof fetch !== 'undefined'
&& fetch(`https://api.npms.io/v2/search/suggestions?q=${search}`).then(
    (response: Response) => response.json()
  )
