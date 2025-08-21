import { useLocation, Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const routeConfig = {
    'product': 'Products',
    'orderdetails': 'Order Details',
   
  };

  // Array of segments to exclude from breadcrumb
  const excludeSegments = [ 'new', "setting" , "Adminoutlet"];

  // Check if a string is an ID (MongoDB ObjectId or numeric ID)
  const isId = (str) => {
    // MongoDB ObjectId (24 characters, hexadecimal)
    if (/^[0-9a-fA-F]{24}$/.test(str)) return true;
    // Numeric ID
    if (/^\d+$/.test(str)) return true;
    // UUID format
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str)) return true;
    // Short ID (check by length - typically IDs are longer than 8 characters and all alphanumeric)
    if (str.length >= 8 && /^[a-zA-Z0-9]+$/.test(str) && !/^[a-zA-Z]+$/.test(str)) return true;
    
    return false;
  };

  // Check if segment should be excluded
  const shouldExclude = (segment) => {
    return isId(segment) || excludeSegments.includes(segment.toLowerCase());
  };

  const breadcrumbItems = [];
  let accumulatedPath = '';

  pathnames.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    
    // Skip if segment should be excluded
    if (shouldExclude(segment)) return;

    // Check if this is the last visible segment
    const remainingSegments = pathnames.slice(index + 1);
    const hasMoreVisibleSegments = remainingSegments.some(seg => !shouldExclude(seg));
    const isLast = !hasMoreVisibleSegments;

    const displayName =
      routeConfig[segment.toLowerCase()] ||
      segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    breadcrumbItems.push({ 
      path: accumulatedPath, 
      name: displayName, 
      isLast 
    });
  });

  return (
    <nav aria-label="breadcrumb" className="rounded-lg pb-4">
      <ol className="flex items-center space-x-1 text-sm">
        <li>
          <Link to="/" className="text-blue-600 hover:underline font-medium flex items-center">
            <FiHome className="mr-1" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <FiChevronRight className="mx-1 text-gray-400" />
            {item.isLast ? (
              <span className="text-gray-600 font-medium">{item.name}</span>
            ) : (
              <Link
                to={item.path}
                className="text-blue-600 hover:underline font-medium"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;