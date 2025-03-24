import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbRootProps,
  HStack,
} from '@chakra-ui/react';
import { lightTheme } from '@shared/styles/theme';
import { Link } from '@tanstack/react-router';

interface BreadcrumbProps extends BreadcrumbRootProps {
  currentLink: React.ReactNode;
  breadCrumbItems: {
    name: string;
    path: string;
    params?: Record<string, string>;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentLink,
  breadCrumbItems,
  size,
}) => {
  return (
    <ChakraBreadcrumb.Root size={size || 'lg'}>
      <ChakraBreadcrumb.List>
        {breadCrumbItems.map((item, i) => (
          <HStack key={item.name}>
            <ChakraBreadcrumb.Item>
              <Link
                to={item.path}
                params={item.params}
                style={{
                  color: i === 1 ? lightTheme.primaryColor : 'inherit',
                }}
              >
                {item.name}
              </Link>
            </ChakraBreadcrumb.Item>
            <ChakraBreadcrumb.Separator />
          </HStack>
        ))}
        <ChakraBreadcrumb.Item>
          <ChakraBreadcrumb.CurrentLink
            style={{
              color:
                breadCrumbItems.length === 1
                  ? lightTheme.primaryColor
                  : 'inherit',
            }}
          >
            {currentLink}
          </ChakraBreadcrumb.CurrentLink>
        </ChakraBreadcrumb.Item>
      </ChakraBreadcrumb.List>
    </ChakraBreadcrumb.Root>
  );
};
export default Breadcrumb;
