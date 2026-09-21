import { PERMISSIONS } from '../../../../packages/shared/src/permissions.js';

export const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
    }

    const userRole = req.user.role;
    const rolePermissions = PERMISSIONS[userRole] || [];

    if (rolePermissions.includes('*')) {
      // Check for negations first if * is present
      const hasNegation = rolePermissions.includes(`!${requiredPermission}`);
      if (hasNegation) {
        return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Permission denied' } });
      }

      // We need to also check wildcard negations e.g., !staff:delete vs required staff:delete
      const negations = rolePermissions.filter(p => p.startsWith('!'));
      for (const neg of negations) {
        const negatedPerm = neg.substring(1);
        if (negatedPerm === requiredPermission || (negatedPerm.endsWith(':*') && requiredPermission.startsWith(negatedPerm.slice(0, -2)))) {
            return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Permission denied' } });
        }
      }
      return next();
    }

    // Exact match
    if (rolePermissions.includes(requiredPermission)) {
      return next();
    }

    // Wildcard match
    const prefix = requiredPermission.split(':')[0];
    if (rolePermissions.includes(`${prefix}:*`)) {
      return next();
    }

    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Permission denied' } });
  };
};
