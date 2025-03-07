import { Avatar } from '@chakra-ui/react';
import { authVar } from '@shared/store/globalAuthState';
import { Link } from '@tanstack/react-router';
import { Users } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Languages } from 'lucide-react';
import { FileUser } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Aside: React.FC = () => {
  const [isClosed, setIsClosed] = useState(false);
  const { email } = authVar();

  return (
    <aside
      style={{
        gridArea: 'navigation',
        minHeight: '100vh',
        width: isClosed ? '56px' : '200px',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: '44px',
        paddingBottom: '16px',
        overflowX: 'hidden',
      }}
    >
      <nav
        style={{
          width: '100%',
          padding: '0px',
          display: 'grid',
          gap: '14px',
          gridTemplateColumns: '1fr',
        }}
      >
        <Link
          to="/users"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 56,
            gap: 16,
            padding: '9px 16px',
            textDecoration: 'none',
            width: '100%',
            overflowX: 'hidden',
            transition: 'background 200ms, color 200ms',
            borderTopRightRadius: 200,
            borderBottomRightRadius: 200,
            // ':hover': {
            //   backgroundColor: 'rgba(inherit, 0.04)',
            // },
          }}
        >
          <Users
            style={{
              userSelect: 'none',
              width: '1em',
              height: '1em',
              display: 'inline-block',
              fill: 'currentcolor',
              flexShrink: 0,
              fontSize: '1.5rem',
              transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <span>Employees</span>
        </Link>
        <Link
          to="/skills"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 56,
            gap: 16,
            padding: '9px 16px',
            textDecoration: 'none',
            width: '100%',
            overflowX: 'hidden',
            transition: 'background 200ms, color 200ms',
            borderTopRightRadius: 200,
            borderBottomRightRadius: 200,
            // ':hover': {
            //   backgroundColor: 'rgba(inherit, 0.04)',
            // },
          }}
        >
          <TrendingUp
            style={{
              userSelect: 'none',
              width: '1em',
              height: '1em',
              display: 'inline-block',
              flexShrink: 0,
              fontSize: '1.5rem',
              transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <span>Skills</span>
        </Link>
        <Link
          to="/languages"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 56,
            gap: 16,
            padding: '9px 16px',
            textDecoration: 'none',
            width: '100%',
            overflowX: 'hidden',
            transition: 'background 200ms, color 200ms',
            borderTopRightRadius: 200,
            borderBottomRightRadius: 200,
            // ':hover': {
            //   backgroundColor: 'rgba(inherit, 0.04)',
            // },
          }}
        >
          <Languages
            style={{
              userSelect: 'none',
              width: '1em',
              height: '1em',
              display: 'inline-block',
              flexShrink: 0,
              fontSize: '1.5rem',
              transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <span>Languages</span>
        </Link>
        <Link
          to="/cvs"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 56,
            gap: 16,
            padding: '9px 16px',
            textDecoration: 'none',
            width: '100%',
            overflowX: 'hidden',
            transition: 'background 200ms, color 200ms',
            borderTopRightRadius: 200,
            borderBottomRightRadius: 200,
            // ':hover': {
            //   backgroundColor: 'rgba(inherit, 0.04)',
            // },
          }}
        >
          <FileUser
            style={{
              userSelect: 'none',
              width: '1em',
              height: '1em',
              display: 'inline-block',
              flexShrink: 0,
              fontSize: '1.5rem',
              transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <span>CVs</span>
        </Link>
      </nav>
      <div>
        <button
          style={{
            position: 'relative',
            boxSizing: 'border-box',
            cursor: 'pointer',
            userSelect: 'none',
            verticalAlign: 'middle',
            appearance: 'none',
            fontSize: '0.875rem',
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '56px',
            minHeight: '56px',
            minWidth: '56px',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            textTransform: 'none',
            outline: 0,
            borderWidth: 0,
            borderStyle: 'initial',
            borderColor: 'initial',
            borderImage: 'initial',
            margin: 0,
            textDecoration: 'none',
            transition:
              'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '0px 8px',
            borderRadius: '0px 200px 200px 0px',
            // ':hover': {
            //   backgroundColor: 'rgba(inherit, 0.04)',
            // },
          }}
        >
          <Avatar.Root
            style={{
              color: 'rgb(245, 245, 247)',
              backgroundColor: 'rgb(198, 48, 49)',
            }}
          >
            <Avatar.Fallback name={email!} />
          </Avatar.Root>
          <span
            style={{
              margin: '0px 0px 0px 8px',
              fontSize: '1rem',
              lineHeight: 1.5,
              letterSpacing: '0.00938em',
              width: '100%',
              overflowX: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textAlign: 'left',
            }}
          >
            {email}
          </span>
        </button>
        <button
          onClick={() => setIsClosed(!isClosed)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxSizing: 'border-box',
            WebkitTapHighlightColor: 'transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            userSelect: 'none',
            verticalAlign: 'middle',
            appearance: 'none',
            textAlign: 'center',
            fontSize: '1.5rem',
            color: 'rgba(0, 0, 0, 0.54)',
            outline: '0',
            borderWidth: '0',
            margin: '14px 0 0 8px',
            textDecoration: 'none',
            flex: '0 0 auto',
            padding: '8px',
            borderRadius: '50%',
            overflow: 'visible',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            // ':hover': {
            //   backgroundColor: 'rgba(inherit, 0.04)',
            // },
          }}
        >
          <ChevronRight
            style={{
              transform: isClosed ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 200ms',
            }}
          />
        </button>
      </div>
    </aside>
  );
};
export default Aside;
