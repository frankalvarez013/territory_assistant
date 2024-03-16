interface StateContextType {
  territories: any[]; // Consider using a more specific type instead of any if possible
  requests: any[]; // Consider using a more specific type instead of any if possible
  updateItems: () => Promise<void>;
}
