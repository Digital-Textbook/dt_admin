import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <SubMenu label='Dashboard' icon={<i className='ri-dashboard-fill' />}>
          <MenuItem href='/'>Analytics</MenuItem>
        </SubMenu>

        <MenuSection label='App & Pages'>
          <SubMenu label='Roles & Permission' icon={<i className='ri-lock-star-line' />}>
            <MenuItem href='/roles'>Roles</MenuItem>
            <MenuItem href='/permission'>Permission</MenuItem>
          </SubMenu>

          <MenuItem href='/textbook' icon={<i className='ri-book-2-line' />}>
            Textbook
          </MenuItem>
          <MenuItem href='/user' icon={<i className='ri-user-line' />}>
            Users
          </MenuItem>
          <MenuItem href='/subject' icon={<i className='ri-git-repository-line' />}>
            Subject
          </MenuItem>
          <MenuItem href='/school' icon={<i className='ri-graduation-cap-line' />}>
            School
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
