//Java Solution

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        
        for (int[] edge : prerequisites) {
            if (!graph.containsKey(edge[0])) {
                graph.put(edge[0], new ArrayList<Integer>());
            }
            graph.get(edge[0]).add(edge[1]);
        }
        
        Set<Integer> visited = new HashSet<>();
        Set<Integer> visiting = new HashSet<>();
        
        for (Map.Entry<Integer, List<Integer>> vertex : graph.entrySet()) {
            if (dfs(vertex.getKey(), graph, visited, visiting)) {
                return false;
            }
        }
        
        return true;
    }
    
    public boolean dfs(int vertex, Map<Integer, List<Integer>> graph, Set<Integer> visited, Set<Integer> visiting) {
        visiting.add(vertex);
        List<Integer> edges = graph.get(vertex);
        
        if (edges != null) {
            for (int edge : edges) {
                if (visited.contains(edge)) {
                    continue;
                }
                
                if (visiting.contains(edge)) {
                    return true;
                }
                
                if (dfs(edge, graph, visited, visiting)) {
                    return true;
                }
            }
        }
        
        visited.add(vertex);
        visiting.remove(vertex);
        return false;
    }
}