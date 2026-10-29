import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VisitsChart } from "@/components/charts/visits-chart"
import { monthlyVisits } from "@/data/mock"

export default function App() {
  return (
    <main className="min-h-svh p-8">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Hello, dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">shadcn/ui is working.</p>
          <VisitsChart data={monthlyVisits} />
        </CardContent>
      </Card>
    </main>
  )
}
