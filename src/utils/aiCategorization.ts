// AI-powered expense categorization
export const categorizeExpense = async (title: string, amount: number): Promise<{
  category: string;
  confidence: number;
  suggestions: string[];
}> => {
  // Simulate AI categorization (in production, you'd use OpenAI or similar)
  const categories = {
    food: ['restaurant', 'food', 'coffee', 'dinner', 'lunch', 'snack', 'pizza', 'burger'],
    transport: ['uber', 'taxi', 'gas', 'fuel', 'bus', 'train', 'metro', 'parking'],
    entertainment: ['movie', 'cinema', 'concert', 'game', 'streaming', 'spotify', 'netflix'],
    shopping: ['amazon', 'store', 'clothes', 'shopping', 'mall', 'online'],
    utilities: ['electricity', 'water', 'internet', 'phone', 'rent', 'mortgage'],
    health: ['doctor', 'medicine', 'pharmacy', 'hospital', 'fitness', 'gym'],
    education: ['course', 'book', 'school', 'university', 'training', 'certification'],
  };

  const titleLower = title.toLowerCase();
  let bestMatch = 'other';
  let confidence = 0.3;

  for (const [category, keywords] of Object.entries(categories)) {
    const matches = keywords.filter(keyword => titleLower.includes(keyword));
    if (matches.length > 0) {
      bestMatch = category;
      confidence = Math.min(0.95, 0.6 + (matches.length * 0.15));
      break;
    }
  }

  // Generate smart suggestions based on amount and category
  const suggestions = generateSmartSuggestions(bestMatch, amount);

  return {
    category: bestMatch,
    confidence,
    suggestions
  };
};

const generateSmartSuggestions = (category: string, amount: number): string[] => {
  const suggestions: Record<string, string[]> = {
    food: amount > 50 
      ? ['Consider cooking at home more often', 'Try meal prepping to save money']
      : ['Great job keeping food costs reasonable!'],
    transport: amount > 100
      ? ['Consider carpooling or public transport', 'Look into monthly transit passes']
      : ['Efficient transport spending!'],
    entertainment: amount > 200
      ? ['Set a monthly entertainment budget', 'Look for free local events']
      : ['Balanced entertainment spending'],
    shopping: amount > 300
      ? ['Try the 24-hour rule before purchases', 'Consider if this was a need vs want']
      : ['Mindful shopping habits!'],
  };

  return suggestions[category] || ['Track this category to identify patterns'];
};

export const getSpendingInsights = (expenses: import('../types').Expense[]) => {
  const insights = [];
  
  // Calculate spending velocity
  const recentExpenses = expenses.filter(e => 
    new Date(e.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  
  if (recentExpenses.length > 10) {
    insights.push({
      type: 'warning',
      title: 'High Spending Velocity',
      message: `You've made ${recentExpenses.length} transactions this week. Consider reviewing your spending patterns.`
    });
  }

  // Find largest expense category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  if (topCategory) {
    insights.push({
      type: 'info',
      title: 'Top Spending Category',
      message: `${topCategory[0]} accounts for $${topCategory[1].toFixed(2)} of your spending.`
    });
  }

  return insights;
};