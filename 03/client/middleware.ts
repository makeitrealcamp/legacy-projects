import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('sillusr');
  const url = req.url;
  if (!token && url.includes('/profile')) {
    return NextResponse.redirect(process.env.VERCEL_FRONTEND_URI as string);
  }
  if (!token && url.includes('/payment')) {
    return NextResponse.redirect(process.env.VERCEL_FRONTEND_URI as string);
  }
  if (!token && url.includes('/register-stepper')) {
    return NextResponse.redirect(process.env.VERCEL_FRONTEND_URI as string);
  }
  if (!token && url.includes('/stepper-contract')) {
    return NextResponse.redirect(process.env.VERCEL_FRONTEND_URI as string);
  }
}
