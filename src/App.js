import React, { useEffect, useState, useRef } from 'react';
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  shorthands,
  tokens,
  Button,
  Text,
  Card,
  CardHeader,
  Body1,
  Subtitle1,
  Title1,
  LargeTitle,
  Link
} from '@fluentui/react-components';
import {
  ArrowUpload24Regular,
  Brain24Regular,
  Edit24Regular,
  Document24Regular,
  Bot24Regular,
  CheckmarkCircle24Regular,
  TaskListSquareLtr24Regular,
  ZoomFit24Regular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(180deg, #FFF8F6 0%, #FFEFEA 40%, #FFE8E3 100%)',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: 'transparent',
    ...shorthands.padding('24px', '0'),
    position: 'absolute',
    top: '0',
    width: '100%',
    zIndex: 100,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('0', '32px'),
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('60px'),
    flex: 1,
    justifyContent: 'flex-start',
  },
  navTitle: {
    fontSize: '22px',
    fontWeight: '500',
    letterSpacing: '-0.02em',
    color: '#2C2C2C',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  navSeparator: {
    display: 'none',
  },
  navLinks: {
    display: 'flex',
    ...shorthands.gap('56px'),
    marginLeft: '0px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  mobileMenuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#2C2C2C',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  mobileMenu: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      ...shorthands.padding('20px'),
      zIndex: 1000,
      opacity: 0,
      visibility: 'hidden',
      transform: 'translateY(-10px)',
      transition: 'all 0.2s ease',
    },
  },
  mobileMenuOpen: {
    '@media (max-width: 768px)': {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
    },
  },
  mobileMenuLink: {
    display: 'block',
    ...shorthands.padding('12px', '0'),
    color: '#4A4A4A',
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    borderBottom: '1px solid #F0F0F0',
    ':hover': {
      color: '#1A1A1A',
    },
  },
  mobileMenuButtons: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('12px'),
    marginTop: '16px',
  },
  orchidStyleSection: {
    background: 'linear-gradient(135deg, #F5F2EF 0%, #E8E1DD 100%)',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    ...shorthands.padding('80px', '0'),
    '@media (max-width: 768px)': {
      ...shorthands.padding('60px', '0'),
    },
  },
  orchidContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('80px'),
    alignItems: 'center',
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('0', '40px'),
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      ...shorthands.gap('40px'),
      ...shorthands.padding('0', '20px'),
    },
  },
  orchidContent: {
    maxWidth: '500px',
  },
  orchidHeaderText: {
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#2C2C2C',
    marginBottom: '24px',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      bottom: '-12px',
      width: '60px',
      height: '2px',
      backgroundColor: '#2C2C2C',
    },
  },
  orchidMainTitle: {
    fontSize: '48px',
    fontWeight: 'normal',
    lineHeight: '1.1',
    color: '#2C2C2C',
    marginBottom: '24px',
    fontFamily: '"MV Jadheedh", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    '@media (max-width: 768px)': {
      fontSize: '36px',
    },
  },
  orchidDescription: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#666666',
    marginBottom: '40px',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  orchidDataSection: {
    borderTop: '2px solid #2C2C2C',
    paddingTop: '24px',
  },
  orchidDataHeader: {
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#2C2C2C',
    marginBottom: '16px',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  orchidStatistic: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: '#8B5A7C',
    fontFamily: '"MV Jadheedh", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: '1',
  },
  orchidPercentSign: {
    fontSize: '48px',
    verticalAlign: 'top',
  },
  orchidImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orchidFeatureImage: {
    maxWidth: '100%',
    height: 'auto',
    ...shorthands.borderRadius('12px'),
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  },
  navLink: {
    color: '#4A4A4A',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px',
    letterSpacing: '-0.01em',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#1A1A1A',
    },
  },
  activeNavLink: {
    color: '#1A1A1A',
    fontWeight: '600',
    fontSize: '14px',
    letterSpacing: '-0.01em',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdownToggle: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('6px'),
    color: '#2C2C2C',
    textDecoration: 'none',
    fontWeight: '400',
    fontSize: '16px',
    letterSpacing: '0.01em',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    ...shorthands.padding('10px', '0'),
    ':hover': {
      color: '#000000',
    },
  },
  dropdownArrow: {
    transition: 'transform 0.2s ease',
    fontSize: '16px',
    display: 'inline-block',
    opacity: 0.7,
    fontWeight: '400',
    lineHeight: '1',
  },
  dropdownArrowOpen: {
    transform: 'rotate(180deg)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '12px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    ...shorthands.borderRadius('8px'),
    ...shorthands.padding('8px'),
    minWidth: '200px',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateY(-10px)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
  },
  dropdownMenuOpen: {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateY(0)',
  },
  dropdownItem: {
    display: 'block',
    ...shorthands.padding('10px', '12px'),
    color: '#4A4A4A',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    ...shorthands.borderRadius('4px'),
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#F5F5F5',
      color: '#1A1A1A',
    },
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  primaryButton: {
    backgroundColor: '#35374E',
    color: '#FFFFFF',
    ...shorthands.borderRadius('20px'),
    ...shorthands.padding('12px', '24px'),
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#2A2B3D',
    },
  },
  secondaryButton: {
    backgroundColor: '#B8B8B8',
    color: '#FFFFFF',
    border: 'none',
    ...shorthands.borderRadius('20px'),
    ...shorthands.padding('12px', '24px'),
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#A0A0A0',
    },
  },
  main: {
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('160px', '20px', '64px'),
    '@media (max-width: 768px)': {
      ...shorthands.padding('120px', '12px', '64px'),
    },
  },
  hero: {
    marginBottom: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroTitle: {
    marginBottom: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: '"MV Jadheedh", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    maxWidth: '900px',
    ...shorthands.margin('0', 'auto', '32px'),
    '& > *': {
      fontSize: '72px',
      lineHeight: '1.1',
      fontWeight: 'normal',
      letterSpacing: '-0.03em',
      fontFamily: '"MV Jadheedh", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#2C2C2C',
    },
    '@media (max-width: 768px)': {
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: '700px',
      '& > *': {
        fontSize: '56px',
        fontWeight: 'bold',
        lineHeight: '1.0',
      },
    },
  },
  typingContainer: {
    height: '160px',
    display: 'grid',
    gridTemplateRows: '20px 1fr',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      height: '120px',
      gridTemplateRows: '15px 1fr',
    },
  },
  heroTitleSecondLine: {
    marginLeft: '200px',
    '@media (max-width: 768px)': {
      marginLeft: '0',
    },
  },
  typingText: {
    fontFamily: '"MV Jadheedh", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '72px',
    lineHeight: '1.1',
    fontWeight: 'normal',
    letterSpacing: '-0.03em',
    color: '#2C2C2C',
    maxWidth: '800px',
    wordWrap: 'break-word',
    textAlign: 'center',
    gridRow: '2',
    alignSelf: 'start',
    '@media (max-width: 768px)': {
      fontSize: '48px',
      maxWidth: '600px',
    },
  },
  cursor: {
    display: 'inline-block',
    width: '3px',
    height: '1em',
    backgroundColor: '#1A1A1A',
    marginLeft: '5px',
    animation: 'blink 1s infinite',
  },
  heroDescription: {
    color: '#666666',
    maxWidth: '700px',
    ...shorthands.margin('0', 'auto', '48px'),
    fontSize: '22px',
    lineHeight: '1.5',
    display: 'block',
    textAlign: 'center',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '400',
    marginTop: '48px',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      marginTop: '24px',
      ...shorthands.margin('0', 'auto', '24px'),
      lineHeight: '1.3',
      fontWeight: '300',
    },
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.gap('16px'),
    flexWrap: 'wrap',
  },
  heroEmailSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    maxWidth: '500px',
    ...shorthands.margin('0', 'auto'),
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      ...shorthands.gap('12px'),
      maxWidth: '100%',
      ...shorthands.padding('0', '12px'),
      width: '100%',
    },
  },
  emailInput: {
    ...shorthands.padding('14px', '20px'),
    ...shorthands.borderRadius('20px'),
    border: '1px solid #E0D0C8',
    fontSize: '14px',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    flex: 1,
    minWidth: '400px',
    backgroundColor: '#FFF8F6',
    ':focus': {
      outline: 'none',
      ...shorthands.border('1px', 'solid', '#35374E'),
      backgroundColor: '#FFFFFF',
    },
    '::placeholder': {
      color: '#999999',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      minWidth: 'unset',
      maxWidth: '100%',
      ...shorthands.padding('16px', '20px'),
      fontSize: '16px',
    },
  },
  getStartedButton: {
    backgroundColor: '#35374E',
    color: '#FFFFFF',
    ...shorthands.borderRadius('12px'),
    ...shorthands.padding('14px', '48px'),
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    minWidth: '160px',
    ':hover': {
      backgroundColor: '#2A2B3D',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      ...shorthands.padding('16px', '32px'),
      fontSize: '16px',
      fontWeight: '600',
    },
  },
  screenshot: {
    ...shorthands.borderRadius('8px'),
    boxShadow: tokens.shadow64,
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  screenshotSection: {
    width: '100%',
    ...shorthands.padding('40px', '0'),
    position: 'relative',
    minHeight: '600px',
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
  },
  screenshotText: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '400px',
    ...shorthands.padding('20px'),
  },
  featureSection: {
    width: '100%',
    ...shorthands.padding('80px', '20px'),
    position: 'relative',
    minHeight: '600px',
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('80px'),
    alignItems: 'center',
  },
  featureSectionReverse: {
    width: '100%',
    ...shorthands.padding('80px', '20px'),
    position: 'relative',
    minHeight: '600px',
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('80px'),
    alignItems: 'center',
  },
  featureContentReverse: {
    gridColumn: '1',
  },
  featureImageReverse: {
    gridColumn: '2',
  },
  featureImage: {
    width: '100%',
    maxWidth: '600px',
    ...shorthands.borderRadius('8px'),
    boxShadow: tokens.shadow64,
  },
  featureContent: {
    direction: 'ltr',
  },
  howItWorks: {
    ...shorthands.padding('80px', '0'),
  },
  howItWorksHeader: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  howItWorksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    ...shorthands.gap('64px'),
    alignItems: 'center',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('32px'),
  },
  step: {
    display: 'flex',
    ...shorthands.gap('16px'),
  },
  stepIcon: {
    width: '48px',
    height: '48px',
    ...shorthands.borderRadius('50%'),
    backgroundColor: '#FFE8DF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  aiModelCard: {
    ...shorthands.padding('32px'),
    backgroundColor: '#FFFBF8',
    ...shorthands.border('1px', 'solid', '#F5D5C8'),
    ...shorthands.borderRadius('8px'),
  },
  aiModelFlow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('24px'),
  },
  flowItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  flowDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: tokens.colorNeutralStroke2,
  },
  processBox: {
    ...shorthands.padding('12px', '20px'),
    backgroundColor: '#FFE8DF',
    ...shorthands.borderRadius('6px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  modelBox: {
    ...shorthands.padding('12px', '16px'),
    backgroundColor: '#FFF5F0',
    ...shorthands.border('1px', 'solid', '#F5D5C8'),
    ...shorthands.borderRadius('6px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('4px'),
  },
  resultBox: {
    ...shorthands.padding('12px', '20px'),
    backgroundColor: '#d4edda',
    ...shorthands.borderRadius('6px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  footer: {
    backgroundColor: '#FFFBF8',
    borderTop: `1px solid #F5D5C8`,
    ...shorthands.padding('32px', '0'),
  },
  footerContent: {
    maxWidth: '1200px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('0', '20px'),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      ...shorthands.gap('16px'),
    },
  },
  footerLinks: {
    display: 'flex',
    ...shorthands.gap('24px'),
  },
});

function App() {
  const styles = useStyles();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const textArray = ['Grade assignments\nfaster', 'Find student errors\ninstantly', 'Save precious\nteaching time'];
  const period = 2000;

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % textArray.length;
      const fullText = textArray[i];
      
      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 50 : 100);
      
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const startPoint = window.innerHeight * 0.2; // Start transition at 20% of viewport
          const endPoint = window.innerHeight * 0.7; // End transition at 70% of viewport (earlier completion)
          
          if (scrollPosition < startPoint) {
            setScrollProgress(0);
          } else if (scrollPosition > endPoint) {
            setScrollProgress(1);
          } else {
            // Gradually transition between 0 and 1
            const progress = (scrollPosition - startPoint) / (endPoint - startPoint);
            const clampedProgress = Math.min(Math.max(progress, 0), 1);
            console.log('Scroll Debug:', {
              scrollPosition,
              startPoint,
              endPoint,
              progress,
              clampedProgress
            });
            setScrollProgress(clampedProgress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <nav className={styles.nav}>
              <Title1 as="h1" className={styles.navTitle}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                SECOND OPINION
              </Title1>
              <div className={styles.navLinks}>
                <div className={styles.dropdownContainer}>
                  <button 
                    className={styles.dropdownToggle}
                    onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')}
                  >
                    Products
                    <span className={`${styles.dropdownArrow} ${openDropdown === 'products' ? styles.dropdownArrowOpen : ''}`}>▾</span>
                  </button>
                  <div className={`${styles.dropdownMenu} ${openDropdown === 'products' ? styles.dropdownMenuOpen : ''}`}>
                    <Link href="#" className={styles.dropdownItem}>Error Detection</Link>
                    <Link href="#" className={styles.dropdownItem}>Smart Grading</Link>
                    <Link href="#" className={styles.dropdownItem}>Analytics Dashboard</Link>
                  </div>
                </div>
                
                <div className={styles.dropdownContainer}>
                  <button 
                    className={styles.dropdownToggle}
                    onClick={() => setOpenDropdown(openDropdown === 'educators' ? null : 'educators')}
                  >
                    For educators
                    <span className={`${styles.dropdownArrow} ${openDropdown === 'educators' ? styles.dropdownArrowOpen : ''}`}>▾</span>
                  </button>
                  <div className={`${styles.dropdownMenu} ${openDropdown === 'educators' ? styles.dropdownMenuOpen : ''}`}>
                    <Link href="#" className={styles.dropdownItem}>Overview</Link>
                    <Link href="#" className={styles.dropdownItem}>Case Studies</Link>
                    <Link href="#" className={styles.dropdownItem}>Resources</Link>
                    <Link href="#" className={styles.dropdownItem}>Book a Demo</Link>
                  </div>
                </div>
                
                <div className={styles.dropdownContainer}>
                  <button 
                    className={styles.dropdownToggle}
                    onClick={() => setOpenDropdown(openDropdown === 'institutions' ? null : 'institutions')}
                  >
                    For institutions
                    <span className={`${styles.dropdownArrow} ${openDropdown === 'institutions' ? styles.dropdownArrowOpen : ''}`}>▾</span>
                  </button>
                  <div className={`${styles.dropdownMenu} ${openDropdown === 'institutions' ? styles.dropdownMenuOpen : ''}`}>
                    <Link href="#" className={styles.dropdownItem}>Enterprise Solutions</Link>
                    <Link href="#" className={styles.dropdownItem}>Integration</Link>
                    <Link href="#" className={styles.dropdownItem}>Security</Link>
                  </div>
                </div>
                
                <div className={styles.dropdownContainer}>
                  <button 
                    className={styles.dropdownToggle}
                    onClick={() => setOpenDropdown(openDropdown === 'company' ? null : 'company')}
                  >
                    Company
                    <span className={`${styles.dropdownArrow} ${openDropdown === 'company' ? styles.dropdownArrowOpen : ''}`}>▾</span>
                  </button>
                  <div className={`${styles.dropdownMenu} ${openDropdown === 'company' ? styles.dropdownMenuOpen : ''}`}>
                    <Link href="#" className={styles.dropdownItem}>About Us</Link>
                    <Link href="#" className={styles.dropdownItem}>Careers</Link>
                    <Link href="#" className={styles.dropdownItem}>Blog</Link>
                    <Link href="#" className={styles.dropdownItem}>Contact</Link>
                  </div>
                </div>
              </div>
            </nav>
            <button 
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
            <div className={styles.buttonGroup}>
              <Button appearance="outline" className={styles.secondaryButton}>Log in</Button>
              <Button appearance="primary" className={styles.primaryButton}>Contact Us</Button>
            </div>
          </div>
          <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <Link href="#" className={styles.mobileMenuLink}>Products</Link>
            <Link href="#" className={styles.mobileMenuLink}>For educators</Link>
            <Link href="#" className={styles.mobileMenuLink}>For institutions</Link>
            <Link href="#" className={styles.mobileMenuLink}>Company</Link>
            <div className={styles.mobileMenuButtons}>
              <Button appearance="outline" className={styles.secondaryButton}>Log in</Button>
              <Button appearance="primary" className={styles.primaryButton}>Contact Us</Button>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroTitle}>
              <div className={styles.typingContainer}>
                <div>
                  <span className={styles.typingText} style={{ whiteSpace: 'pre-line' }}>{typedText}</span>
                  <span className={styles.cursor} style={{
                    animation: 'blink 1s infinite',
                    '@keyframes blink': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0 },
                      '100%': { opacity: 1 },
                    },
                  }}></span>
                </div>
              </div>
            </div>
            <Body1 className={styles.heroDescription}>
              AI-powered grading assistant that instantly identifies errors in student work.
            </Body1>
            <div className={styles.heroEmailSection}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className={styles.emailInput}
              />
              <Button appearance="primary" className={styles.getStartedButton}>Get started</Button>
            </div>
          </section>

          {/* Feature Section 0 - Text Left, Image Right (Orchid Style) */}
          <section className={styles.orchidStyleSection}>
            <div className={styles.orchidContainer}>
              <div className={styles.orchidContent}>
                <div className={styles.orchidHeaderText}>TRANSFORM YOUR GRADING</div>
                <h2 className={styles.orchidMainTitle}>Grade assignments faster with intelligent error detection</h2>
                <p className={styles.orchidDescription}>
                  Detect student errors instantly with our advanced AI system during the grading process. 
                  Identify mistakes that could affect learning outcomes before they become bigger problems.
                </p>
                <div className={styles.orchidDataSection}>
                  <div className={styles.orchidDataHeader}>THE DIFFERENCE IS MORE ACCURACY</div>
                  <div className={styles.orchidStatistic}>>95<span className={styles.orchidPercentSign}>%</span></div>
                </div>
              </div>
              <div className={styles.orchidImageContainer}>
                <img 
                  className={styles.orchidFeatureImage}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAp8eE0Cc3Wzq-yQ9rbRu1Wy7UdqZcCnbxDW-bJHmyLXl0j9jducz7HDvIY8fbCo7R5Jo8sTrahGJBfuYWEN-1QmBBP4lvQu3p7WXkqzELRIGNNYVOPtQ2CxNMJwGsTM5sTmGDK1xOLshcgIucdNIt2CyOiHAapXPnE3p4amRhp8_KGRglAf2nTxTImxOFMT1xwLSj4sBeI1uC7M8pKEb1GGcluvkInfDMXX8sJrB-K1IFUlSByoojQasflRPJVyzaHsmoYnCr0Ag"
                  alt="Dashboard showing AI-powered grading analysis"
                />
              </div>
            </div>
          </section>

          {/* Feature Section 1 - Image Left, Text Right */}
          <section className={styles.featureSection}>
            <img 
              className={styles.featureImage}
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
              alt="Real-time error detection dashboard"
            />
            <div className={styles.featureContent}>
              <Title1 style={{ marginBottom: '24px' }}>Real-Time Error Detection</Title1>
              <Body1 style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Our advanced AI instantly identifies mathematical errors, logical inconsistencies, and formatting issues as students work.
              </Body1>
              <Body1 style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Get immediate insights into common mistake patterns and provide targeted feedback to help students learn more effectively.
              </Body1>
              <Button appearance="primary" size="large" className={styles.primaryButton}>
                Learn More
              </Button>
            </div>
          </section>

          {/* Feature Section 2 - Text Left, Image Right */}
          <section className={styles.featureSectionReverse}>
            <div className={`${styles.featureContent} ${styles.featureContentReverse}`}>
              <Title1 style={{ marginBottom: '24px' }}>Smart Grading Assistant</Title1>
              <Body1 style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Automatically grade assignments with customizable rubrics and detailed explanations for each scoring decision.
              </Body1>
              <Body1 style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Save hours of manual grading while maintaining consistency and providing comprehensive feedback to every student.
              </Body1>
              <Button appearance="primary" size="large" className={styles.primaryButton}>
                Try Grading Tool
              </Button>
            </div>
            <img 
              className={`${styles.featureImage} ${styles.featureImageReverse}`}
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
              alt="Smart grading interface with rubrics"
            />
          </section>

          {/* Feature Section 3 - Image Left, Text Right */}
          <section className={styles.featureSection}>
            <img 
              className={styles.featureImage}
              src="https://images.unsplash.com/photo-1553028826-f4804151e50b?w=600&h=400&fit=crop"
              alt="Analytics dashboard showing student progress"
            />
            <div className={styles.featureContent}>
              <Title1 style={{ marginBottom: '24px' }}>Progress Analytics</Title1>
              <Body1 style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Track student progress with detailed analytics and identify learning gaps before they become bigger problems.
              </Body1>
              <Body1 style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Generate comprehensive reports for parents and administrators with actionable insights for improving learning outcomes.
              </Body1>
              <Button appearance="primary" size="large" className={styles.primaryButton}>
                View Analytics
              </Button>
            </div>
          </section>

          <section className={styles.howItWorks}>
            <div className={styles.howItWorksHeader}>
              <Title1>How it works</Title1>
              <Body1 style={{ marginTop: '8px', color: tokens.colorNeutralForeground2 }}>
                Our AI-powered process simplifies your grading workflow.
              </Body1>
            </div>

            <div className={styles.howItWorksGrid}>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <ArrowUpload24Regular primaryFill={tokens.colorBrandForeground1} />
                  </div>
                  <div className={styles.stepContent}>
                    <Subtitle1>1. Upload Solutions</Subtitle1>
                    <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                      Scan or upload student work in various formats, from handwritten notes to digital documents.
                    </Body1>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Brain24Regular primaryFill={tokens.colorBrandForeground1} />
                  </div>
                  <div className={styles.stepContent}>
                    <Subtitle1>2. AI Analysis</Subtitle1>
                    <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                      Our intelligent engine analyzes the solution, comparing it against the correct methodology and final answer.
                    </Body1>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Edit24Regular primaryFill={tokens.colorBrandForeground1} />
                  </div>
                  <div className={styles.stepContent}>
                    <Subtitle1>3. Review & Feedback</Subtitle1>
                    <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                      Get a detailed report highlighting potential errors, allowing you to provide targeted, effective feedback.
                    </Body1>
                  </div>
                </div>
              </div>

              <Card className={styles.aiModelCard}>
                <CardHeader header={<Subtitle1>Our AI Model</Subtitle1>} />
                <div className={styles.aiModelFlow}>
                  <div className={styles.flowItem}>
                    <Document24Regular />
                    <Text>Image/PDF Input</Text>
                  </div>
                  
                  <div className={styles.flowDivider} />
                  
                  <div className={styles.processBox}>
                    <ZoomFit24Regular primaryFill={tokens.colorBrandForeground1} />
                    <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>
                      OCR & Preprocessing
                    </Text>
                  </div>
                  
                  <div className={styles.flowDivider} />
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div className={styles.modelBox}>
                      <Bot24Regular />
                      <Text size={200} weight="semibold">Error Detection Model</Text>
                    </div>
                    <div className={styles.modelBox}>
                      <TaskListSquareLtr24Regular />
                      <Text size={200} weight="semibold">Solution Matching</Text>
                    </div>
                  </div>
                  
                  <div className={styles.flowDivider} />
                  
                  <div className={styles.resultBox}>
                    <CheckmarkCircle24Regular style={{ color: '#155724' }} />
                    <Text weight="semibold" style={{ color: '#155724' }}>
                      Analysis & Feedback Report
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
              © 2023 Marking Copilot. All rights reserved.
            </Text>
            <div className={styles.footerLinks}>
              <Link href="#" appearance="subtle">Privacy Policy</Link>
              <Link href="#" appearance="subtle">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </FluentProvider>
  );
}

export default App;