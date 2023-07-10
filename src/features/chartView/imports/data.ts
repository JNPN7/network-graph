import { Person } from "../../../store/personSlice";

export const STRENGTH = -50;
export const SIZE_INCREASE_BY_HOVER = 3;
const COUNTRY_COLOR = "#f1e05a"
const COUNTRY_SIZE = 30
const NAME_COLOR = "#77fd8c"
const NAME_SIZE = 20
const DISTANCE = 100

export enum NODE_TYPE {
  country,
  name
}

export default function getNodesAndLinks(people: Person[]): [{}[], {}[] ]{

  var nodes: {}[] = []
  var links: {}[]  = []

  people.forEach((person) => {
    var countryNode = {id: person.country, type: NODE_TYPE.country, color: COUNTRY_COLOR, size: COUNTRY_SIZE}
    const nameNode = {id: person.name, personID: person.id, type: NODE_TYPE.name, color: NAME_COLOR, size: NAME_SIZE}

    var hasNode = false
    for (let index = 0; index < nodes.length; index++) {
      const node: any = nodes[index];
      if (node.id == countryNode.id) {
        countryNode = node
        hasNode = true
        break
      }
    }
    
    if (!hasNode) nodes.push(countryNode)

    nodes.push(nameNode)

    links.push({source: nameNode, target: countryNode, distance: DISTANCE})
  })

  return [nodes, links]
}