package com.tronget.util;
import com.tronget.model.Dot;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import lombok.NonNull;

@Named
@ApplicationScoped
public class DotChecker implements Checker<Dot> {

    @Override
    public boolean check(@NonNull Dot dot) {
        double x = dot.getX();
        double y = dot.getY();
        double r = dot.getR();
        return checkCircle(r, x, y) || checkTriangle(r, x, y) || checkSquare(r, x, y);
    }

    private boolean checkTriangle(double r, double x, double y) {
        if (x >= 0 && x <= r && y >= 0 && y <= r / 2) {
            if (x == r) {
                return y == 0;
            }
            double xLength = r - x;
            double tan = y / xLength;
            return tan <= 0.5;
        }
        return false;
//        if (x <= 0 && x >= -r && y >= 0 && y <= r / 2) {
//            if (x == -r) {
//                return y == 0;
//            }
//            double xLength = r + x;
//            double tan = y / xLength;
//            return tan <= 0.5;
//        }
//        return false;
    }

    private boolean checkCircle(double r, double x, double y) {
        return x >= -r / 2 && x <= 0 && y >= -r / 2 && y <= 0 && Math.sqrt(x * x + y * y) <= r / 2;
//        return x >= 0 && x <= r / 2 && y >= -r / 2 && y <= 0 && Math.sqrt(x * x + y * y) <= r / 2;
    }

    private boolean checkSquare(double r, double x, double y) {
        return x <= r && x >= 0 && y <= 0 && y >= -r;
//        return x <= r && x >= 0 && y <= r && y >= 0;
    }

}
