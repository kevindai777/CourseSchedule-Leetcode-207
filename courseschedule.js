//Objective is to see if it's possible to take a certain number of classes,
//given each class has a set of prerequisite classes.

let numCourses = 2, prerequisites = [[1,0],[0,1]]


//O(n) solution that does a dfs traversal through each vertex to see if 
//there's a cycle, in which case the course schedule is invalid

let graph = new Map()
let visited = new Set()
let visiting = new Set()

//Make the adjacency list
for (let [v,e] of prerequisites) {
    if (!graph.has(v)) {
        graph.set(v, [e])
    } else {
        let edges = graph.get(v)
        edges.push(e)
        graph.set(v, edges)
    }
}

//Check every vertex for a cycle
for (let [v,e] of graph) {
    if (dfs(v)) {
        return false
    }
}

return true

function dfs(vertex) {
    visiting.add(vertex)
    let edges = graph.get(vertex)
    
    if (edges) {
        for (let edge of edges) {
            //If the edge has been visited already, skip
            if (visited.has(edge)) {
                continue
            }
            
            //If we're visiting the same node in the same loop,
            //there is a cycle
            if (visiting.has(edge)) {
                return true
            }
            
            //If a neighbor of the edge also has a cycle,
            //then the graph is still invalid
            if (dfs(edge)) {
                return true
            }
        }
    }
    
    visiting.delete(vertex)
    visited.add(vertex)
    return false
}