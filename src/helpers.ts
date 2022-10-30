const durationRegex: RegExp = /\d+[smhd]?/

function formatDuration(duration: string): number {
  if(duration.match(durationRegex) == null) throw Error("Invalid duration")
  if(duration.endsWith("s")) {
    return Number(duration)
  } else if(duration.endsWith("m")) {
    return Number(duration)*60
  } else if(duration.endsWith("h")) {
    return Number(duration)*3600
  } else if(duration.endsWith("d")) {
    return Number(duration)*86400
  } else {
    return Number(duration)*3600
  }
}


export { formatDuration }