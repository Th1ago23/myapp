import { createBottomTabNavigator, BottomTabNavigationProp }
  from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

import { Dashboard } from '../pages/Dashboard'
import { ListExpenses } from '../pages/ListExpenses'
import { SearchExpenses }
  from '../pages/SearchExpenses'

type AppRoutes = {
  dashboard: undefined;
  listExpenses: undefined;
  searchExpenses: undefined
}

export type AppNavigationRoutesProp =
  BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator screenOptions={{
      headerShown: false,
      // tabBarShowLabel: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.text,
      tabBarStyle: {
        height: 88
      }
    }}>
      <Screen
        name='dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: 'Incluir',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='add'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='listExpenses'
        component={ListExpenses}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='list'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='searchExpenses'
        component={SearchExpenses}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='search'
              size={size}
              color={color}
            />
          )
        }}
      />

    </Navigator>
  )

}