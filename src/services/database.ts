import { supabase } from '../lib/supabase';

// User Management
export const userService = {
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};

// Tasks Management
export const taskService = {
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assigned_to:users(first_name, last_name),
        department:departments(name)
      `);
    if (error) throw error;
    return data;
  },

  async createTask(taskData: any) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateTask(taskId: number, taskData: any) {
    const { data, error } = await supabase
      .from('tasks')
      .update(taskData)
      .eq('task_id', taskId)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Products Management
export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(name)
      `);
    if (error) throw error;
    return data;
  },

  async createProduct(productData: any) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateProduct(productId: number, productData: any) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('product_id', productId)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Deliveries Management
export const deliveryService = {
  async getDeliveries() {
    const { data, error } = await supabase
      .from('deliveries')
      .select(`
        *,
        product:products(name)
      `);
    if (error) throw error;
    return data;
  },

  async createDelivery(deliveryData: any) {
    const { data, error } = await supabase
      .from('deliveries')
      .insert(deliveryData)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Finances Management
export const financeService = {
  async getTransactions() {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select(`
        *,
        category:financial_categories(name, type)
      `);
    if (error) throw error;
    return data;
  },

  async createTransaction(transactionData: any) {
    const { data, error } = await supabase
      .from('financial_transactions')
      .insert(transactionData)
      .select();
    if (error) throw error;
    return data[0];
  },
};

// Seasons Management
export const seasonService = {
  async getCurrentSeason() {
    const { data, error } = await supabase
      .from('seasons')
      .select(`
        *,
        activities:season_activities(*)
      `)
      .eq('status', 'active')
      .single();
    
    if (error) {
      // Check if it's a "no rows" error
      if (error.code === 'PGRST116' || error.message.includes('no rows')) {
        console.log('No active season found');
        return null;
      }
      throw error;
    }
    
    return data;
  },

  async updateSeason(seasonId: number, seasonData: any) {
    const { data, error } = await supabase
      .from('seasons')
      .update(seasonData)
      .eq('season_id', seasonId)
      .select();
    if (error) throw error;
    return data[0];
  },
}; 