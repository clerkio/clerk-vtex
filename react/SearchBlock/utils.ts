export const ensureSingleWordClass = (
    className: string | undefined
  ): string | undefined => {
    return className?.split(' ').join('-')
  }
  
export const adjustFacetTitles = (
  facetsAttributeTitles: string | undefined
): string | undefined => {
  if(typeof facetsAttributeTitles != 'string' || !facetsAttributeTitles){
    return
  }

  let outPut = {}

  facetsAttributeTitles.split(',').forEach(pair => {
    const split_pair = pair.split(':')
    if(split_pair.length === 2){
      const __key = split_pair[0]
      const __val = split_pair[1]
      let tmp = {}
      tmp = { [__key]: __val }
      outPut = Object.assign({}, outPut, tmp);
    }
  })

  const json_titles = JSON.stringify(outPut)

  if(typeof json_titles == 'string'){
    return json_titles
  }
  
  return ''
  
}
