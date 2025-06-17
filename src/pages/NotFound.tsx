
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">404</span>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-slate-500">
            Attempted to access: <code className="bg-slate-100 px-2 py-1 rounded">{location.pathname}</code>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
